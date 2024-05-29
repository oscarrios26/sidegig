import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:8000",
});

const getToken = () => {
	return new Promise((resolve) => {
		resolve(`Bearer ${localStorage.getItem("token") || null}`);
	});
};

api.interceptors.request.use(
	async function (config) {
		config.headers["Authorization"] = await getToken();
		return config;
	},
	function (error) {
		console.log("Request error: ", error);
		return Promise.reject(error);
	}
);

export default api;
