export interface ManagementFile {
    id: string
    userID: string
    encryptedData: Uint8Array | string
    contentType: string
    fileName: string
}

export interface TransferFile {
    transferID: string
    encryptedData: Uint8Array | string
    contentType: string
    fileName: string
    createdDate: Date
}

export interface TransferDTO {
    transferID: string
}