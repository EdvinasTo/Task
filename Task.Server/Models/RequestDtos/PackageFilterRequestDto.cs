using System.ComponentModel.DataAnnotations;
using Task.Server.Models.Enums;

namespace Task.Server.Models.RequestDtos
{
    public class PackageFilterRequestDto
    {
        [Range(1, int.MaxValue, ErrorMessage = "PackageId must be a positive number.")]
        public int? PackageId { get; set; }

        public PackageStatus? Status { get; set; }
    }
}