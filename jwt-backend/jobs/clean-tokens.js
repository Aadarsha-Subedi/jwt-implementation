import pool from '../db/db.js';

import cron from 'node-cron';

export async function cleanupTokens() {
	cron.schedule('0 0 0 * * *', async () => {
		console.log('Running expired token cleanup...');
		try {
			const response = await pool.query(
				'DELETE FROM tokens WHERE expires_at < NOW()'
			);
			console.log(
				`Expired tokens cleanup completed. Rows affected: ${response.rowCount}`
			);
		} catch (error) {
			console.error('Error during expired tokens cleanup:', error);
		}
	});
}
