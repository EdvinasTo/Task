using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Task.Server.Models.Enums;

namespace Task.Server.Models.Entities
{
    public class PackageHistoryEntity
    {
        [ForeignKey("Package")]
        public int PackageId { get; set; }

        public virtual Package Package{ get; set; }

        public DateTime Date { get; set; }
        
        [Required]
        public PackageStatus Status { get; set; }
    }
}