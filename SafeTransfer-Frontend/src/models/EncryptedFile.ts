export interface ManagementFile {
    id: string
    userID: string
    encryptedData: string
    contentType: string
    fileName: string
}

export interface TransferFile {
    transferID: string
    encryptedData: string
    contentType: string
    fileName: string
    createdDate: Date
}