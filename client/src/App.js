import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import SavedJobs from "./components/SavedJobs/SavedJobs";
import { useEffect, useState } from "react";
import { getJobs } from "./services/jobs";
import axios from "axios";
import { verifyUser } from "./services/users";
import { jwtDecode } from "jwt-decode";

function App() {
	const [user, setUser] = useState("");
	const [jobs, setJobs] = useState([]);
	const [userLocation, setUserLocation] = useState({});
	const [descriptionText, setDescriptionText] = useState("");
	const [userId, setUserId] = useState("");
	const [dateJoined, setDateJoined] = useState("");

	useEffect(() => {
		if (localStorage.getItem("token")) {
			const fetchUser = async () => {
				const token = JSON.stringify(localStorage.getItem("token"));
				const decoded = jwtDecode(token);
				const resp = await verifyUser(decoded.user_id);
				if (resp) {
					setUser(resp.username);
					let date = new Date(resp.date_joined);
					date = date.toUTCString();
					date = date.slice(7, 16);
					setDateJoined(date);
					setUserId(decoded.user_id);
				}
			};
			fetchUser();
		}

		const getUserLocation = () => {
			if ("geolocation" in navigator) {
				// Prompt user for permission to access their location
				navigator.geolocation.getCurrentPosition(
					// Success callback function
					(position) => {
						// Get the user's latitude and longitude coordinates
						fetchJobs(position.coords.latitude, position.coords.longitude);
					},
					// Error callback function
					(error) => {
						// Handle errors, e.g. user denied location sharing permissions
						console.error("Error getting user location:", error);
					}
				);
			} else {
				// Geolocation is not supported by the browser
				console.error("Geolocation is not supported by this browser.");
			}
		};
		getUserLocation();

		const fetchJobs = async (lat, lng) => {
			const userLocation = await axios.get(
				`https://geocode.maps.co/reverse?lat=${lat}&lon=${lng}&api_key=${process.env.REACT_APP_LOCATION_API_KEY}`
			);
			setUserLocation({
				country: userLocation.data.address.country,
				state: userLocation.data.address.state,
				county: userLocation.data.address.county,
				city: userLocation.data.address.city,
				postcode: userLocation.data.address.postcode,
			});
			const resp = await getJobs();
			resp.sort((a, b) => {
				return new Date(b.created_at) - new Date(a.created_at);
			});
			setDescriptionText("Description:");
			setJobs(resp);
		};
	}, []);
	return (
		<div className="App">
			<Routes>
				<Route
					path="/home"
					element={
						<Home
							userLocation={userLocation}
							user={user}
							setUser={setUser}
							userId={userId}
							dateJoined={dateJoined}
							jobs={jobs}
							descriptionText={descriptionText}
						/>
					}
				/>
				<Route
					path="/:userId/saved-jobs"
					element={
						<SavedJobs
							userLocation={userLocation}
							user={user}
							setUser={setUser}
							userId={userId}
							dateJoined={dateJoined}
							jobs={jobs}
							descriptionText={descriptionText}
						/>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
