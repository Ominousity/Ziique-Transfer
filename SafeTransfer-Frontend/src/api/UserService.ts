import { User } from "@/models/User";
import axios from "axios";

export async function GetUser(username: string) : Promise<User> {
	username = atob(username);

	return await axios.get(
		`http://localhost:8081/api/User/GetUser/${username}`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`,
			},
		}
	).then((response) => response.data);
}

export async function Login(user: User) {
	user.username = atob(user.username);
	user.password = atob(user.password);

	const token = (await axios.post("http://localhost:8081/api/User/Login", user)).data;
    localStorage.setItem("token", token);
}

export async function Register(user: User) {
	user.username = atob(user.username);
	user.password = atob(user.password);

	await axios.post("http://localhost:8081/api/User/Register", user, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}
