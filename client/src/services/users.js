import api from "./apiConfig";

export const signUp = async (credentials) => {
	try {
		const resp = await api.post("user/signup/", credentials);
		localStorage.setItem("token", resp.data);
		const user = resp.data;
		return user;
	} catch (error) {
		throw error;
	}
};

export const logIn = async (credentials) => {
	try {
		const resp = await api.post("user/login/", credentials);
		const user = resp.data;
		return user;
	} catch (error) {
		throw error;
	}
};

export const signOut = async () => {
	try {
		localStorage.removeItem("user");
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

export const verifyUser = async (user) => {
	const res = await api.get(`/verify/${user}/`);
	return res.data;
};
