import pool from '../../db/db.js';
import {
	generateAccessToken,
	generateRefreshToken,
} from '../../utils/tokens.js';

export const LoginController = async (req, res) => {
	const { email, password } = req.body;

	try {
		const existingUser = await pool.query(
			'SELECT * FROM users WHERE email=$1',
			[email]
		);
		if (
			!existingUser.rowCount ||
			existingUser.rows[0].password !== password
		) {
			return res.status(500).json({
				message: 'Invalid credentials',
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: 'Server error. Try again later.',
		});
	}
	const accessToken = generateAccessToken(email);
	const refreshToken = await generateRefreshToken(email, req);
	if (!refreshToken) {
		return res.status(500).json({
			message: 'Server error. Please try again.',
		});
	}
	res.cookie('refreshToken', refreshToken, {
		httpOnly: true,
		sameSite: 'lax',
		secure: false,
		path: '/',
	});
	return res.status(200).json({
		message: 'User successfully logged in!',
		accessToken: accessToken,
	});
};
