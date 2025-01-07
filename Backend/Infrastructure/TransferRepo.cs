using Application.Interfaces;
using Domain.Transfer;

namespace Infrastructure;

public class TransferRepo : ITransferRepo
{
    private readonly DatabaseContext _context;
    public TransferRepo(DatabaseContext dbContext) 
    {
        _context = dbContext;
    }

    public TransferFile GetTransfer(Guid transferID)
    {
        TransferFile? file = _context.TransferFiles.Find(transferID);
        if (file is null)
        {
            throw new Exception("Transfer not found");
        }
        return file;
    }

    public List<TransferFile> GetAllTransfers()
    {
        return _context.TransferFiles.ToList();
    }

    public Guid SaveTransfer(TransferFile transfer)
    {
        Guid ID = _context.TransferFiles.Add(transfer).Entity.TransferID;
        _context.SaveChanges();

        return ID;
    }

    public void DeleteTransfer(Guid transferID)
    {
        TransferFile? file = _context.TransferFiles.Find(transferID);
        if (file is null)
        {
            throw new Exception("Transfer not found");
        }
        _context.TransferFiles.Remove(file);
        _context.SaveChanges();
    }
}
