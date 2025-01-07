using Domain.Management;
using Domain.Transfer;
using Domain.User;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<TransferFile> TransferFiles { get; set; }
    public DbSet<ManagementFile> ManagementFiles { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.ID);

            entity.Property(e => e.ID)
                .ValueGeneratedOnAdd();
            
            entity.Property(e => e.Username).IsRequired();
            entity.Property(e => e.Password).IsRequired();
        });

        modelBuilder.Entity<TransferFile>(entity =>
        {
            entity.HasKey(e => e.TransferID);

            entity.Property(e => e.TransferID)
                .ValueGeneratedOnAdd();
            
            entity.Property(e => e.EncryptedData).IsRequired();
            entity.Property(e => e.ContentType).IsRequired();
            entity.Property(e => e.FileName).IsRequired();
        });

        modelBuilder.Entity<ManagementFile>(entity =>
        {
            entity.HasKey(e => e.ID);

            entity.Property(e => e.ID)
                .ValueGeneratedOnAdd();
            
            entity.Property(e => e.UserID).IsRequired();
            entity.Property(e => e.EncryptedData).IsRequired();
            entity.Property(e => e.ContentType).IsRequired();
            entity.Property(e => e.FileName).IsRequired();
        });
    }
}
