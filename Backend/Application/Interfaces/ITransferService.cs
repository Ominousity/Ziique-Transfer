using Domain.Transfer;

namespace Application.Interfaces;

public interface ITransferService
{
    TransferFile GetTransfer(Guid transferID);
    List<TransferFile> GetAllTransfers();
    Guid SaveTransfer(TransferFile transfer);
    void DeleteTransfer(Guid transferID);
}
