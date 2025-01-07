using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options)
    {
    }

    public DbSet<TransferFile> Transfers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TransferFile>(entity =>
        {
            entity.HasKey(e => e.TransferID);

            entity.Property(e => e.TransferID)
                .ValueGeneratedOnAdd();
            
            entity.Property(e => e.EncryptedData).IsRequired();
            entity.Property(e => e.ContentType).IsRequired();
            entity.Property(e => e.FileName).IsRequired();
        });
    }
}
