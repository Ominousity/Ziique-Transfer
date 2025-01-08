import { TransferFile } from "@/models/EncryptedFile";
import axios from "axios";

export async function GetTransfer(transferID: string) {
	return await axios.get(
		`https://localhost:8081/api/Transfer/GetTransfer/${transferID}`
	);
}

export async function saveTransfer(transfer: TransferFile) {
	return await axios.post(
		"https://localhost:8081/api/Transfer/SaveTransfer",
		transfer
	);
}
