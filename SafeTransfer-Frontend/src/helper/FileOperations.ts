import { decrypt, encrypt } from "./Encryption";
import { saveAs } from "file-saver";
import { saveTransfer } from "@/api/TransferService";
import { SaveFileToUser } from "@/api/ManagementService";
import { TransferFile } from "@/models/EncryptedFile";
import { util } from "node-forge";

export function handleFileDownload(data: TransferFile | null, key: string | util.ByteStringBuffer) {
    try {
        if (!data) {
            throw new Error("Data is null");
        }
        const decryptedData = decrypt(data.encryptedData, key);
		const byteArray = convertToUint8Array(decryptedData);
		console.log(byteArray)
        const blob = new Blob([byteArray], { type: data.contentType });
        saveAs(blob, data.fileName);
    } catch (error) {
        console.error("Error downloading and decrypting file:", error);
    }
}

function convertToUint8Array(byteString: string): Uint8Array {
    // Split the string by commas to get an array of byte values as strings
    const byteValues = byteString.split(',');

    // Convert each byte value to a number and create a Uint8Array
    const byteArray = new Uint8Array(byteValues.map(Number));

    return byteArray;
}

export async function handleFileUpload(file: File, key: string): Promise<string> {
	const fileData = ReadFile(file);
	const encryptedData = encrypt(await fileData, key);

	const transferFile = {
		transferID: "00000000-0000-0000-0000-000000000000",
		encryptedData: encryptedData,
		contentType: file.type,
		fileName: file.name,
		createdDate: new Date(),
	};

	return (await saveTransfer(transferFile)).transferID;
	
}

export async function handleFileUploadUser(file: File, userId: string, key: string): Promise<string> {
	const fileData = ReadFile(file);
	const encryptedData = encrypt(await fileData, key);

	const managementFile = {
		id: "00000000-0000-0000-0000-000000000000",
		userID: userId,
		encryptedData: encryptedData,
		contentType: file.type,
		fileName: file.name,
	};

	return (await SaveFileToUser(managementFile)).data;
}

async function ReadFile(file: File): Promise<ArrayBuffer> {
    return await file.arrayBuffer();
}
