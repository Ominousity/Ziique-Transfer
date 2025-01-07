using System;
using Domain;

namespace Application.Interfaces;

public interface ITransferService
{
    TransferFile GetEncryptedTransfer(Guid transferID);
    Guid SaveEncryptedTransfer(TransferFile transfer);
}
