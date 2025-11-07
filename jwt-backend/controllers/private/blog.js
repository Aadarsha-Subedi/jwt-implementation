export const BlogController = (req, res) => {
	return res.status(200).json({
		message: 'Your protected blog ',
	});
};
