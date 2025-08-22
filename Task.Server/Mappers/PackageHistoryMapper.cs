using Task.Server.Models.Entities;
using Task.Server.Models;
using Task.Server.Models.Enums;
using System;

namespace Task.Server.Mappers
{
    public static class PackageHistoryMapper
    {
        public static PackageHistoryEntity ToEntity(int packageId, PackageStatus status) =>
            new PackageHistoryEntity
            {
                PackageId = packageId,
                Date = DateTime.UtcNow,
                Status = status
            };

        public static PackageHistory ToDto(PackageHistoryEntity entity)
        {
            return new PackageHistory
            {
                status = entity.Status,
                date = entity.Date
            };
        }
    }
}
