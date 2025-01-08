import { TransferFile } from "@/models/EncryptedFile";
import axios from "axios";

export async function GetTransfer(transferID: string) {
	return await axios.get(
		`http://localhost:8081/api/Transfer/${transferID}`
	);
}

export async function saveTransfer(transfer: TransferFile) {
	return await axios.post(
		"http://localhost:8081/api/Transfer",
		transfer
	);
}
