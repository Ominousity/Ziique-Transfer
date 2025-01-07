using Domain.Transfer;

namespace Application.Interfaces;

public interface ITransferRepo
{
    TransferFile GetTransfer(Guid transferID);
    List<TransferFile> GetAllTransfers();
    Guid SaveTransfer(TransferFile transfer);
    void DeleteTransfer(Guid transferID);
}
