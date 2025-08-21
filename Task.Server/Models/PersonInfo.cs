using System.ComponentModel.DataAnnotations;

namespace Task.Server.Models
{
    public class PersonInfo
    {
        [Required]
        [MinLength(10)]
        [MaxLength(50)]
        public string SenderName { get; set; } = string.Empty;

        [Required]
        [MinLength(10)]
        [MaxLength(100)]
        public string SenderAddress { get; set; } = string.Empty;

        [Required]
        [Phone]
        [MinLength(10)]
        [MaxLength(16)]
        public string SenderPhone { get; set; } = string.Empty;
    }
}