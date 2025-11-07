import { useEffect } from "react";

import axios from "axios";

import { Container } from "../../components/wrappers/container";
import { useAuthStore } from "../../stores/auth";
import { useBlogStore } from "../../stores/blog";
import { url } from "../../utils/url";

export const Blog = () => {
	const accessToken = useAuthStore((state) => state.accessToken);
	const blog = useBlogStore((state) => state.blog);
	const setBlog = useBlogStore((state) => state.setBlog);

	async function getBlogPage() {
		try {
			const response = await axios({
				url: `${url}/user/blogs`,
				method: "GET",
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				withCredentials: true,
			});
			setBlog(response.data.message);
		} catch (error) {
			console.log("Server error. Please try again later.");
		}
	}

	useEffect(() => {
		getBlogPage();
	}, [setBlog]);

	return (
		<Container>
			<h1>This is a protected Blog page!</h1>
			<p className="text-4xl font-bold italic">{blog}</p>
		</Container>
	);
};
