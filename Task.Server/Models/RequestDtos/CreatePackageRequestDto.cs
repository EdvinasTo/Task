using System.ComponentModel.DataAnnotations;

namespace Task.Server.Models.RequestDtos
{
    public class CreatePackageRequestDto
    {
        [Required]
        public PersonInfo SenderInfo { get; set; }

        [Required]
        public PersonInfo RecipientInfo { get; set; }
    }
}