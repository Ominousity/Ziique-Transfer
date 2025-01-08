import { User } from "@/models/User";
import axios from "axios";

export async function GetUser(username: string): Promise<User> {
	return await axios.get(
		`https://localhost:8081/api/User/GetUser/${username}`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	);
}

export async function Login(user: User) {
	const token = (await axios.post("https://localhost:8081/api/User/Login", user)).data;
    localStorage.setItem("token", token);
}

export async function Register(user: User) {
	await axios.post("https://localhost:8081/api/User/Register", user);
}
