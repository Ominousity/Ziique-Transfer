import { TransferFile } from "@/models/EncryptedFile";
import { decrypt, encrypt } from "./Encryption";
import { saveAs } from "file-saver";
import { saveTransfer } from "@/api/TransferService";

export function handleFileDownload(data: TransferFile, key: string) {
	try {
		const decryptedData = decrypt(data.EncryptedData, key);

		const blob = new Blob([decryptedData], { type: data.ContentType });
		saveAs(blob, data.FileName);
	} catch (error) {
		console.error("Error downloading and decrypting file:", error);
	}
}

export function handleFileUpload(file: File, key: string): string {
	const reader = new FileReader();
	reader.onload = async (event) => {
		const fileData = event.target?.result;
		if (typeof fileData !== "string") {
      console.error("Error reading file data");
      return;
		}
    const encryptedData = encrypt(fileData, key);

		const transferFile = {
      TransferID: "00000000-0000-0000-0000-000000000000",
			EncryptedData: encryptedData,
			ContentType: file.type,
			FileName: file.name,
      CreatedDate: new Date(),
		};

    return (await saveTransfer(transferFile)).data;
	};
  return "";
}
