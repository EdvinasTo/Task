using Task.Server.Models.Entities;
using Task.Server.Models.ResponseDtos;
using Task.Server.Models;
using Task.Server.Models.RequestDtos;
using Task.Server.Models.Enums;
using System.Linq;

namespace Task.Server.Mappers
{
    public static class PackageMapper
    {
        public static PackageResponseDto ToResponseDto(Package package)
        {
            var latestHistory = package.History
                .OrderByDescending(h => h.Date)
                .FirstOrDefault();

            return new PackageResponseDto
            {
                Id = package.Id,
                SenderName = package.Sender.PersonInfo.Name,
                RecipientName = package.Recipient.PersonInfo.Name,
                Status = latestHistory?.Status ?? PackageStatus.Created,
                DateTime = latestHistory?.Date ?? System.DateTime.UtcNow
            };
        }

        public static PackageDetailsResponseDto ToDetailsDto(Package package)
        {
            return new PackageDetailsResponseDto
            {
                SenderInfo = package.Sender.PersonInfo,
                RecipientInfo = package.Recipient.PersonInfo,
                packageHistory = package.History
                    .OrderBy(h => h.Date)
                    .Select(PackageHistoryMapper.ToDto)
                    .ToArray()
            };
        }

        public static Package ToEntity(CreatePackageRequestDto dto, int senderId, int recipientId) =>
            new Package
            {
                SenderId = senderId,
                RecipientId = recipientId
            };
    }
}
