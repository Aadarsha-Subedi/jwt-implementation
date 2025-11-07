import { create } from "zustand";

interface BlogProps {
	blog: string | null;
	setBlog: (blog: string) => void;
}

export const useBlogStore = create<BlogProps>((set) => ({
	blog: null,
	setBlog: (blog) => set({ blog: blog }),
}));
