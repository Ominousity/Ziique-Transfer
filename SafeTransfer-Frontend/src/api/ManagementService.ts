import { ManagementFile } from "@/models/EncryptedFile";
import axios from "axios";

export async function GetFilesFromUser(userID: string): Promise<ManagementFile[]> {
	return await axios.get(
		`http://localhost:8081/api/Management/${userID}`,
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
		"http://localhost:8081/api/Management",
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
		`http://localhost:8081/api/Management/${fileID}`,
        {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
}
