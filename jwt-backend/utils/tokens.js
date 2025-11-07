import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

import pool from '../db/db.js';

dotenv.config({
	path: '.env',
	quiet: true,
});

export function generateAccessToken(email) {
	const accessToken = jwt.sign({ email }, process.env.ACCESS_SECRET, {
		expiresIn: '15m',
	});
	return accessToken;
}
export async function generateRefreshToken(email, req) {
	const refreshToken = jwt.sign({ email }, process.env.REFRESH_SECRET, {
		expiresIn: '7d',
	});
	const tokenHash = await bcrypt.hash(refreshToken, 10);

	const expiresAt = new Date();
	expiresAt.setDate(expiresAt.getDate() + 7);
	const expiresAtUTC = expiresAt.toISOString();
	try {
		const response = await pool.query(
			'INSERT INTO tokens(email, token_hash, device, ip_address, expires_at) VALUES($1, $2, $3, $4, $5)',
			[email, tokenHash, req.headers['user-agent'], req.ip, expiresAtUTC]
		);
	} catch (error) {
		return undefined;
	}
	return refreshToken;
}
