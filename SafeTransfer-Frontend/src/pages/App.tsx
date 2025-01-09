import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function App() {
	useEffect(() => {
		const fetchData = async () => {
			try {
				
				const token = localStorage.getItem("token") || "";
				const decodedToken = jwtDecode(token);

				const currentDate = new Date();

				// JWT exp is in seconds
				if (decodedToken.exp && decodedToken.exp * 1000 < currentDate.getTime()) {
					// Token is expired
					localStorage.removeItem("token");
				}
			} catch (err) {
				console.error(err);
			}
		};

		fetchData();
	}, []); // Empty dependency array ensures this runs only once

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/:id" element={<Home />} />
				<Route path="/Profile" element={<Profile />} />
			</Routes>
		</Router>
	);
}

export default App;
