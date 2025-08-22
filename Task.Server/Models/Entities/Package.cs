using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Task.Server.Models.Entities
{
    public class Package
    {
        [Key]
        public int Id { get; set; } 

        [Required]
        [ForeignKey("Sender")]
        public int SenderId { get; set; }

        public virtual Person Sender { get; set; }

        [Required]
        [ForeignKey("Recipient")]
        public int RecipientId { get; set; }

        public virtual Person Recipient { get; set; }

        public virtual ICollection<PackageHistoryEntity> History { get; set; }
    }
}