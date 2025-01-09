import { TransferFile } from "@/models/EncryptedFile";
import { decrypt, encrypt } from "./Encryption";
import { saveAs } from "file-saver";
import { saveTransfer } from "@/api/TransferService";
import { SaveFileToUser } from "@/api/ManagementService";

export function handleFileDownload(data: TransferFile, key: string) {
	try {
		const decryptedData = decrypt(data.EncryptedData, key);

		const blob = new Blob([decryptedData], { type: data.ContentType });
		saveAs(blob, data.FileName);
	} catch (error) {
		console.error("Error downloading and decrypting file:", error);
	}
}

export async function handleFileUpload(file: File, key: string): Promise<string> {
	const fileData = ReadFile(file);
	const encryptedData = encrypt(fileData, key);

	const transferFile = {
		TransferID: "00000000-0000-0000-0000-000000000000",
		EncryptedData: encryptedData,
		ContentType: file.type,
		FileName: file.name,
		CreatedDate: new Date(),
	};

	return (await saveTransfer(transferFile)).data;
	
}

export async function handleFileUploadUser(file: File, userId: string, key: string): Promise<string> {
	const fileData = ReadFile(file);
	const encryptedData = encrypt(fileData, key);

	const managementFile = {
		ID: "00000000-0000-0000-0000-000000000000",
		UserID: userId,
		EncryptedData: encryptedData,
		ContentType: file.type,
		FileName: file.name,
	};

	return (await SaveFileToUser(managementFile)).data;
}

function ReadFile(file: File): string {
	const reader = new FileReader();
	reader.readAsText(file);
	reader.onload = function () {
		return reader.result as string;
	};
	return "";
}