using System;

namespace Domain;

public class TransferFile
{
    public Guid TransferID { get; set; }
    public string EncryptedData { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
    public DateTime CreatedDate { get; set; } = DateTime.Now;
}
