using System.ComponentModel.DataAnnotations;
using Task.Server.Models.Enums;

namespace Task.Server.Models.RequestDtos
{
    public class UpdatePackageStatusRequestDto
    {
        [Required]
        public PackageStatus Status { get; set; }
    }
}