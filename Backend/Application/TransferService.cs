using Application.Interfaces;
using Domain.Transfer;

namespace Application;

public class TransferService : ITransferService
{
    private readonly ITransferRepo _transferRepo;

    public TransferService(ITransferRepo transferRepo)
    {
        _transferRepo = transferRepo;
    }

    public TransferFile GetTransfer(Guid transferID)
    {
        return _transferRepo.GetTransfer(transferID);
    }

    public List<TransferFile> GetAllTransfers()
    {
        return _transferRepo.GetAllTransfers();
    }

    public Guid SaveTransfer(TransferFile transfer)
    {
        return _transferRepo.SaveTransfer(transfer);
    }

    public void DeleteTransfer(Guid transferID)
    {
        _transferRepo.DeleteTransfer(transferID);
    }
}
