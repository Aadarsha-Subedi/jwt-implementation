interface ContainerProps {
	children: React.ReactNode;
	className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
	return (
		<div
			className={`flex min-h-screen min-w-full items-center justify-center bg-slate-300 ${className}`}
		>
			{children}
		</div>
	);
};
