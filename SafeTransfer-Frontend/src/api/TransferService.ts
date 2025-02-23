import { TransferDTO, TransferFile } from "@/models/EncryptedFile";
import axios from "axios";

export async function GetTransfer(transferID: string) {
	return await axios.get(
		`http://localhost:8081/api/Transfer/${transferID}`
	).then((response) => response.data);
}

export async function saveTransfer(transfer: TransferFile):Promise<TransferDTO> {
	return await axios.post(
		"http://localhost:8081/api/Transfer",
		transfer
		
	).then((response) => response.data );
}
