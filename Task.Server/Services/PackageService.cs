using Microsoft.EntityFrameworkCore;
using Task.Server.Data;
using Task.Server.Models.Entities;
using Task.Server.Models.RequestDtos;
using Task.Server.Models.ResponseDtos;
using Task.Server.Models.Enums;
using Task.Server.Models;
using Task.Server.Interfaces;
using Task.Server.Mappers;
using System.Threading.Tasks;
using System;

namespace Task.Server.Services
{
    public class PackageService : IPackageService
    {
        private readonly AppDbContext _context;

        public PackageService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<PackageResponseDto> CreatePackageAsync(CreatePackageRequestDto request)
        {
            var sender = await FindOrCreatePersonAsync(request.SenderInfo);
            var recipient = await FindOrCreatePersonAsync(request.RecipientInfo);

            var package = PackageMapper.ToEntity(request, sender.Id, recipient.Id);
            _context.Packages.Add(package);
            await _context.SaveChangesAsync();

            var historyRecord = PackageHistoryMapper.ToEntity(package.Id, PackageStatus.Created);
            _context.PackageHistory.Add(historyRecord);
            await _context.SaveChangesAsync();

            var packageWithIncludes = await _context.Packages
                .Include(p => p.Sender)
                .Include(p => p.Recipient)
                .Include(p => p.History)
                .FirstOrDefaultAsync(p => p.Id == package.Id);

            return PackageMapper.ToResponseDto(packageWithIncludes);
        }

        public async Task<PackageResponseDto[]> GetAllPackagesAsync(PackageFilterRequestDto? filter = null)
        {
            var query = _context.Packages
                .Include(p => p.Sender)
                .Include(p => p.Recipient)
                .Include(p => p.History)
                .AsQueryable();

            if (filter != null)
            {
                if (filter.PackageId.HasValue)
                {
                    query = query.Where(p => p.Id.ToString().Contains(filter.PackageId.Value.ToString()));
                }

                if (filter.Status.HasValue)
                {
                    query = query.Where(p => p.History
                        .OrderByDescending(h => h.Date)
                        .First().Status == filter.Status.Value);
                }
            }

            var packages = await query.ToListAsync();
            return packages.Select(PackageMapper.ToResponseDto).ToArray();
        }

        public async Task<PackageDetailsResponseDto> GetPackageDetailsAsync(int packageId)
        {
            var package = await _context.Packages
                .Include(p => p.Sender)
                .Include(p => p.Recipient)
                .Include(p => p.History)
                .FirstOrDefaultAsync(p => p.Id == packageId);

            if (package == null)
            {
                throw new ArgumentException($"Package with ID {packageId} not found.");
            }

            return PackageMapper.ToDetailsDto(package);
        }

        public async Task<PackageDetailsResponseDto> UpdatePackageStatusAsync(int packageId, PackageStatus status)
        {
            var package = await _context.Packages
                .Include(p => p.Sender)
                .Include(p => p.Recipient)
                .Include(p => p.History)
                .FirstOrDefaultAsync(p => p.Id == packageId);

            if (package == null)
            {
                throw new ArgumentException($"Package with ID {packageId} not found.");
            }

            var latestStatus = package.History
                .OrderByDescending(h => h.Date)
                .FirstOrDefault()?.Status ?? PackageStatus.Created;

            ValidateStatusTransition(latestStatus, status);

            var newHistoryRecord = PackageHistoryMapper.ToEntity(packageId, status);
            _context.PackageHistory.Add(newHistoryRecord);
            await _context.SaveChangesAsync();

            await _context.Entry(package).Collection(p => p.History).LoadAsync();

            return PackageMapper.ToDetailsDto(package);
        }

        private async Task<Person> FindOrCreatePersonAsync(PersonInfo personInfo)
        {
            var existingPerson = await _context.Persons
                .FirstOrDefaultAsync(p =>
                    p.PersonInfo.Name == personInfo.Name &&
                    p.PersonInfo.Phone == personInfo.Phone);

            if (existingPerson != null)
            {
                return existingPerson;
            }

            var newPerson = PersonMapper.ToEntity(personInfo);
            _context.Persons.Add(newPerson);
            await _context.SaveChangesAsync();

            return newPerson;
        }

        private void ValidateStatusTransition(PackageStatus currentStatus, PackageStatus newStatus)
        {
            bool isValid = currentStatus switch
            {
                PackageStatus.Created => newStatus == PackageStatus.Sent || newStatus == PackageStatus.Canceled,
                PackageStatus.Sent => newStatus == PackageStatus.Accepted || newStatus == PackageStatus.Returned || newStatus == PackageStatus.Canceled,
                PackageStatus.Returned => newStatus == PackageStatus.Sent || newStatus == PackageStatus.Canceled,
                PackageStatus.Accepted => false,
                PackageStatus.Canceled => false,
                _ => false
            };

            if (!isValid)
                throw new InvalidOperationException($"Cannot change status from {currentStatus} to {newStatus}.");
        }
    }
}
