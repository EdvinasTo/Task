using Task.Server.Models.RequestDtos;
using Task.Server.Models.ResponseDtos;
using Task.Server.Models.Enums;
using System.Threading.Tasks;

namespace Task.Server.Interfaces
{
    public interface IPackageService
    {
        Task<PackageResponseDto> CreatePackageAsync(CreatePackageRequestDto request);
        Task<PackageResponseDto[]> GetAllPackagesAsync(PackageFilterRequestDto? filter = null);
        Task<PackageDetailsResponseDto> GetPackageDetailsAsync(int packageId);
        Task<PackageDetailsResponseDto> UpdatePackageStatusAsync(int packageId, PackageStatus status);
    }
}