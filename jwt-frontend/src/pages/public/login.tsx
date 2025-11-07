import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Container } from "../../components/wrappers/container.tsx";

import { useAuthStore } from "../../stores/auth.ts";
import { url } from "../../utils/url.ts";

export const Login = () => {
	const navigate = useNavigate();

	async function loginUser(formData: FormData): Promise<void> {
		const email = formData.get("email");
		const password = formData.get("password");

		try {
			const response = await axios({
				url: `${url}/login`,
				method: "POST",
				data: { email, password },
				withCredentials: true,
			});
			useAuthStore.getState().setAccessToken(response.data.accessToken);
			navigate("/user");
		} catch (error) {
			console.log("Server error. Please try again later.");
		}
	}

	return (
		<Container>
			<div className="flex flex-col gap-y-4">
				<h1 className="text-xl font-bold">
					Welcome! Signin to continue!
				</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						const formData: FormData = new FormData(
							e.currentTarget,
						);
						loginUser(formData);
					}}
					className="flex flex-col gap-y-2"
				>
					<div className="flex gap-x-2">
						<label htmlFor="email">Email</label>
						<input
							name="email"
							id="email"
							required
							type="email"
							className="bg-white"
						/>
					</div>
					<div className="flex gap-x-2">
						<label htmlFor="password">Password</label>
						<input
							name="password"
							id="password"
							required
							type="password"
							className="bg-white"
						/>
					</div>
					<button
						type="submit"
						className="rounded-md bg-black px-4 py-1 text-white"
					>
						Login
					</button>
				</form>
			</div>
		</Container>
	);
};
