using System;
using Application.Interfaces;
using Domain;

namespace Infrastructure;

public class TransferRepo : ITransferRepo
{
    private readonly DatabaseContext _context;
    public TransferRepo(DatabaseContext dbContext) 
    {
        _context = dbContext;
    }

    public TransferFile GetEncryptedTransfer(Guid transferID)
    {
        TransferFile? file = _context.Transfers.Find(transferID);
        if (file is null)
        {
            throw new Exception("Transfer not found");
        }
        return file;
    }

    public Guid SaveEncryptedTransfer(TransferFile transfer)
    {
        Guid ID = _context.Transfers.Add(transfer).Entity.TransferID;
        _context.SaveChanges();

        return ID;
    }
}
