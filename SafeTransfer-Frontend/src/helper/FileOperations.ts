import { decrypt, encrypt } from "./Encryption";
import { saveAs } from "file-saver";
import { saveTransfer } from "@/api/TransferService";
import { SaveFileToUser } from "@/api/ManagementService";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleFileDownload(data: any, key: string) {
	try {
		const decryptedData = decrypt(data.encryptedData, key);

		const blob = new Blob([decryptedData], { type: data.contentType });
		saveAs(blob, data.fileName);
	} catch (error) {
		console.error("Error downloading and decrypting file:", error);
	}
}

export async function handleFileUpload(file: File, key: string): Promise<string> {
	const fileData = ReadFile(file);
	const encryptedData = encrypt(fileData, key);

	const transferFile = {
		transferID: "00000000-0000-0000-0000-000000000000",
		encryptedData: encryptedData,
		contentType: file.type,
		fileName: file.name,
		createdDate: new Date(),
	};

	return (await saveTransfer(transferFile)).data;
	
}

export async function handleFileUploadUser(file: File, userId: string, key: string): Promise<string> {
	const fileData = ReadFile(file);
	const encryptedData = encrypt(fileData, key);

	const managementFile = {
		id: "00000000-0000-0000-0000-000000000000",
		userID: userId,
		encryptedData: encryptedData,
		contentType: file.type,
		fileName: file.name,
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