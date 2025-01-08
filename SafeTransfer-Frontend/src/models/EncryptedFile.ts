export interface ManagementFile {
    ID: string
    UserID: string
    EncryptedData: string
    ContentType: string
    FileName: string
}

export interface TransferFile {
    TransferID: string
    EncryptedData: string
    ContentType: string
    FileName: string
    CreatedDate: Date
}