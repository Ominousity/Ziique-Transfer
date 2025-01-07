using System;
using Domain;

namespace Application.Interfaces;

public interface ITransferRepo
{
    TransferFile GetEncryptedTransfer(Guid transferID);
    Guid SaveEncryptedTransfer(TransferFile transfer);
}
