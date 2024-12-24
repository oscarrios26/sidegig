import "./App.css";
import { jwtDecode } from "jwt-decode";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { verifyUser } from "./services/users";
import Home from "./screens/Home/Home";

function App() {
	const [user, setUser] = useState("");

	useEffect(() => {
		if (localStorage.getItem("token")) {
			const fetchUser = async () => {
				const token = JSON.stringify(localStorage.getItem("token"));
				const decoded = jwtDecode(token);
				const resp = await verifyUser(decoded.user_id);
				resp ? setUser(resp.username) : setUser(null);
			};
			fetchUser();
		}
	}, []);

	return (
		<div className="App">
			<Routes>
				<Route path="/home" element={<Home user={user} setUser={setUser} />} />
			</Routes>
		</div>
	);
}

export default App;
