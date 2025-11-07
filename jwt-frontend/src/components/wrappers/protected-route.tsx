import { useAuthStore } from "../../stores/auth";

import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const accessToken = useAuthStore((state) => state.accessToken);

	if (!accessToken) {
		return <Navigate to="/login" />;
	}

	return children;
};
