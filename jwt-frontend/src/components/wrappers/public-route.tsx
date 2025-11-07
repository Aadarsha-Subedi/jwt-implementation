import { useAuthStore } from "../../stores/auth";

import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
	const accessToken = useAuthStore((state) => state.accessToken);

	if (accessToken) {
		return <Navigate to="/user" />;
	}

	return children;
};
