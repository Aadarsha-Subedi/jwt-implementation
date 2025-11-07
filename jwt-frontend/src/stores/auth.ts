import { create } from "zustand";

interface AuthStoreProps {
	accessToken: string | null;
	setAccessToken: (token: string | null) => void;
	logout: () => void;
	loading: boolean; // new
	setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStoreProps>((set) => ({
	accessToken: null,
	setAccessToken: (token) => set({ accessToken: token }),
	logout: () => set({ accessToken: null }),
	loading: true,
	setLoading: (loading) => set({ loading: loading }),
}));
