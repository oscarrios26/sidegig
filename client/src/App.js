import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { verifyUser } from "./services/users";
import Home from "./screens/Home/Home";

function App() {
	const [user, setUser] = useState("");

	useEffect(() => {
		if (localStorage.getItem("token")) {
			const fetchUser = async () => {
				const userName = JSON.parse(localStorage.getItem(["user"]));
				console.log(userName.username);
				const resp = await verifyUser(userName.id);
				console.log(resp);
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
