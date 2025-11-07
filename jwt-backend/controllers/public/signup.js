import pool from '../../db/db.js';

export const SignupController = async (req, res) => {
	const { email, password } = req.body;

	try {
		const response = await pool.query(
			'INSERT INTO users(email, password) VALUES($1,$2)',
			[email, password]
		);
		return res.status(200).json({
			message: 'User successfully signed in!',
		});
	} catch (error) {
		return res.status(500).json({
			message: 'Server error. Try again later.',
		});
	}
};
