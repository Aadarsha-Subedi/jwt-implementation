import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuthStore } from "../../stores/auth";

import { Container } from "../../components/wrappers/container";
import { url } from "../../utils/url";

export const User = () => {
	const navigate = useNavigate();
	const accessToken = useAuthStore((state) => state.accessToken);

	async function logoutUser(): Promise<void> {
		try {
			await axios({
				url: `${url}/user/logout`,
				method: "POST",
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				withCredentials: true,
			});
		} catch (error) {
			console.log("Server error. Please try again later.");
		}
		useAuthStore.getState().logout();
		navigate("/");
	}

	return (
		<Container>
			<div>
				<h1 className="text-3xl font-bold italic">User's page</h1>
				<button
					type="submit"
					className="rounded-md bg-black px-4 py-1 text-white"
					onClick={() => logoutUser()}
				>
					Logout
				</button>
			</div>
			<NavLink to="/user/blogs" className="text-blue-500">
				Go to Blogs
			</NavLink>
		</Container>
	);
};
