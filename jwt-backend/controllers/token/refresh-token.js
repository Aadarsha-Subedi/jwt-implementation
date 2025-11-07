import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import pool from '../../db/db.js';
import { generateAccessToken } from '../../utils/tokens.js';

dotenv.config({
	path: '.env',
	quiet: true,
});
export const RefreshTokenController = async (req, res) => {
	let email = '';
	try {
		const refreshToken = req.cookies.refreshToken;
		if (!refreshToken) {
			return res.status(401).json({
				message: 'No refresh token found.',
			});
		}

		try {
			const payload = jwt.verify(
				refreshToken,
				process.env.REFRESH_SECRET
			);
			email = payload.email;
		} catch (error) {
			return res.status(403).json({
				message: 'Invalid refresh token.',
			});
		}

		const existingTokens = await pool.query(
			'SELECT * FROM tokens WHERE email=$1',
			[email]
		);
		if (!existingTokens.rowCount) {
			return res.status(403).json({
				message: 'Refresh token not found',
			});
		}

		let validToken = null;
		for (const row of existingTokens.rows) {
			const match = await bcrypt.compare(refreshToken, row.token_hash);
			if (
				match &&
				!row.revoked &&
				new Date(row.expires_at) > new Date()
			) {
				validToken = row;
				break;
			}
		}
		if (!validToken) {
			return res.status(403).json({
				message: 'Refresh token revoked or expired',
			});
		}
		const accessToken = generateAccessToken(email);
		return res.status(200).json({
			accessToken,
		});
	} catch (error) {
		return res.status(403).json({
			message: 'Server error.',
		});
	}
};
