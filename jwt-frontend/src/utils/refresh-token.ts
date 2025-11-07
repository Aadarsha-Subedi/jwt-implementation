import axios from "axios";

import { useAuthStore } from "../stores/auth";
import { url } from "./url";

export async function refreshAccessToken() {
	const setAccessToken = useAuthStore.getState().setAccessToken;
	const setLoading = useAuthStore.getState().setLoading;

	setLoading(true);
	try {
		const response = await axios({
			url: `${url}/refresh`,
			method: "POST",
			withCredentials: true,
		});
		const newToken = response.data.accessToken;
		if (newToken) {
			setAccessToken(newToken);
			return newToken;
		} else {
			setAccessToken(null);
			return null;
		}
	} catch (error) {
		setAccessToken(null);
		return null;
	} finally {
		setLoading(false);
	}
}
