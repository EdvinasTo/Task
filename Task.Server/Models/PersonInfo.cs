using System.ComponentModel.DataAnnotations;

namespace Task.Server.Models
{
    public class PersonInfo
    {
        [Required]
        [MinLength(10)]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MinLength(10)]
        [MaxLength(100)]
        public string Address { get; set; }

        [Required]
        [Phone]
        [MinLength(10)]
        [MaxLength(16)]
        public string Phone { get; set; }
    }
}