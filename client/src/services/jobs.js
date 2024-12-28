import api from "./apiConfig";

export const getJobs = async () => {
	try {
		const response = await api.get(`/jobs/`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const postJob = async (credentials) => {
	try {
		const response = await api.post(`/jobs/`, credentials);
		return response.data;
	} catch (error) {
		throw error;
	}
};
