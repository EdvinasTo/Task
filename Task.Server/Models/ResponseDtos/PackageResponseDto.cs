using System;
using Task.Server.Models.Enums;

namespace Task.Server.Models.ResponseDtos
{
    public class PackageResponseDto
    {
        public int Id { get; set; }

        public string SenderName { get; set; }

        public string RecipientName { get; set; }

        public PackageStatus Status { get; set; }

        public DateTime DateTime { get; set; }
    }
}