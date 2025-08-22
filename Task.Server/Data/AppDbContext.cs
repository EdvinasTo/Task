using Microsoft.EntityFrameworkCore;
using Task.Server.Models.Entities;

namespace Task.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Package> Packages { get; set; }
        public DbSet<Person> Persons { get; set; }
        public DbSet<PackageHistoryEntity> PackageHistory { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Person>().OwnsOne(p => p.PersonInfo);

            modelBuilder.Entity<Package>()
                .HasOne(p => p.Sender)
                .WithMany()
                .HasForeignKey(p => p.SenderId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Package>()
                .HasOne(p => p.Recipient)
                .WithMany()
                .HasForeignKey(p => p.RecipientId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PackageHistoryEntity>()
                .HasOne(ph => ph.Package)
                .WithMany(p => p.History)
                .HasForeignKey(ph => ph.PackageId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PackageHistoryEntity>()
                .HasKey(ph => new { ph.PackageId, ph.Date });
        }
    }
}