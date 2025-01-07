using System;
using Application.Interfaces;
using Domain;

namespace Application;

public class TransferService : ITransferService
{
    private readonly ITransferRepo _transferRepo;

    public TransferService(ITransferRepo transferRepo)
    {
        _transferRepo = transferRepo;
    }

    public TransferFile GetEncryptedTransfer(Guid transferID)
    {
        return _transferRepo.GetEncryptedTransfer(transferID);
    }

    public Guid SaveEncryptedTransfer(TransferFile transfer)
    {
        return _transferRepo.SaveEncryptedTransfer(transfer);
    }
}
