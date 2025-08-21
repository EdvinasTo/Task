using System;
using Task.Server.Models.Enums;

namespace Task.Server.Models
{
    public class PackageHistory
    {
        public PackageStatus status { get; set; }

        public DateTime date { get; set; }
    }
}