import { ManagementFile } from "@/models/EncryptedFile";
import axios from "axios";

export async function GetFilesFromUser(userID: string) {
	return await axios.get(
		`https://localhost:8081/api/Management/GetFilesFromUser/${userID}`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
}

export async function SaveFileToUser(managementFile: ManagementFile) {
	return await axios.post(
		"https://localhost:8081/api/Management/SaveFileToUser",
		managementFile,
        {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
}

export async function DeleteFileFromUser(fileID: string) {
	return await axios.delete(
		`https://localhost:8081/api/Management/DeleteFileFromUser/${fileID}`,
        {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
}
