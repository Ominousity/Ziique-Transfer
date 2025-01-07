using System;

namespace Domain.Management;

public class ManagementFile
{
    public Guid ID { get; set; }
    public Guid UserID { get; set; }
    public string EncryptedData { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
    public string FileName { get; set; } = string.Empty;
}
