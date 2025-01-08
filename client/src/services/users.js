import api from "./apiConfig";

export const signUp = async (credentials) => {
	try {
		const resp = await api.post("/user/signup/", credentials);
		localStorage.setItem("token", resp.data.token.token);
		const user = resp.data;
		return user;
	} catch (error) {
		throw error;
	}
};

export const logIn = async (credentials) => {
	try {
		const resp = await api.post("/user/login/", credentials);
		localStorage.setItem("token", resp.data.token.token);
		return resp.data;
	} catch (error) {
		throw error;
	}
};

export const signOut = async () => {
	try {
		localStorage.removeItem("token");
		return true;
	} catch (error) {
		throw error;
	}
};

export const getUsers = async () => {
	try {
		const response = await api.get(`/users/`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const verifyUser = async (userId) => {
	const res = await api.get(`/verify/${userId}/`);
	return res.data;
};

export const savedJobs = async (credentials) => {
	try {
		const response = await api.post(`/saved/`, credentials);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getSavedJobs = async (userId) => {
	try {
		const response = await api.get(`/saved-jobs/${userId}/`);
		return response.data;
	} catch (error) {
		throw error;
	}
};
