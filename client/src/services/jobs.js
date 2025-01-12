import api from "./apiConfig";

export const getJobs = async () => {
	try {
		const response = await api.get(`/jobs/`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getJob = async (id) => {
	try {
		const response = await api.get(`/jobs/${id}`);
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

export const postMessage = async (credentials) => {
	try {
		const response = await api.post(`/job-messages/`, credentials);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const getMessages = async (userId) => {
	try {
		const response = await api.get(`/job-messages/${userId}/`);
		return response.data;
	} catch (error) {
		throw error;
	}
};
