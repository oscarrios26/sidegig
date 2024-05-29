import api from "./apiConfig";

export const getUsers = async () => {
	try {
		const response = await api.get(`/users/`);
		return response.data;
	} catch (error) {
		throw error;
	}
};
