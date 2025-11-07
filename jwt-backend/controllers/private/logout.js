import pool from '../../db/db.js';

export const LogoutController = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;

		if (refreshToken) {
			const response = await pool.query(
				'UPDATE tokens SET revoked = true WHERE token_hash=$1',
				[refreshToken]
			);
			res.clearCookie('refreshToken', {
				httpOnly: true,
				sameSite: 'lax',
				secure: false,
				path: '/',
			});
			res.status(200).json({
				message: 'Logged out successfully!',
			});
		}
	} catch (error) {
		return res.status(500).json({
			message: 'Server error during logout',
		});
	}
};
