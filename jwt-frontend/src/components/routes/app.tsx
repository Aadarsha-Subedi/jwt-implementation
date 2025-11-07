import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Landing } from "../../pages/public/landing";
import { Login } from "../../pages/public/login";
import { Signup } from "../../pages/public/signup";
import { User } from "../../pages/protected/user";

import { ProtectedRoute } from "../wrappers/protected-route";
import { PublicRoute } from "../wrappers/public-route";
import { useEffect } from "react";
import { refreshAccessToken } from "../../utils/refresh-token";
import { Blog } from "../../pages/protected/blog";
import { useAuthStore } from "../../stores/auth";
import { Loader } from "../wrappers/loader";

export const App = () => {
	const loading = useAuthStore((state) => state.loading);

	useEffect(() => {
		console.log("Refresh function ran!");
		refreshAccessToken();
	}, []);
	if (loading) {
		return <Loader />;
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/">
					<Route
						index
						element={
							<PublicRoute>
								<Landing />
							</PublicRoute>
						}
					/>
					<Route
						path="login"
						element={
							<PublicRoute>
								<Login />
							</PublicRoute>
						}
					/>
					<Route
						path="signup"
						element={
							<PublicRoute>
								<Signup />
							</PublicRoute>
						}
					/>
					<Route path="user">
						<Route
							index
							element={
								<ProtectedRoute>
									<User />
								</ProtectedRoute>
							}
						/>
						<Route
							path="blogs"
							element={
								<ProtectedRoute>
									<Blog />
								</ProtectedRoute>
							}
						/>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
