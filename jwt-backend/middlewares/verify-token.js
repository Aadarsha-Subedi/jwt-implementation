import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({
	path: '.env',
	quiet: true,
});

export const verifyToken = async (req, res, next) => {
	const authHeader = req.headers['authorization'];
	if (!authHeader) {
		return res.status(401).json({ message: 'No token provided' });
	}

	// Expecting format: "Bearer <token>"
	const token = authHeader.split(' ')[1];
	if (!token) {
		return res.status(401).json({ message: 'Invalid token format' });
	}

	try {
		const payload = jwt.verify(token, process.env.ACCESS_SECRET);
		req.email = payload.email;
		next(); // proceed to next middleware / route handler
	} catch (err) {
		return res.status(403).json({ message: 'Invalid or expired token' });
	}
};
