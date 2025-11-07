import express from 'express';

import dotenv from 'dotenv';
import CookieParser from 'cookie-parser';
import cors from 'cors';

import { SignupRouter } from './routes/public/signup.js';
import { LoginRouter } from './routes/public/login.js';
import { RefreshTokenRouter } from './routes/token/refresh-token.js';
import { LogoutRouter } from './routes/private/logout.js';

import { verifyToken } from './middlewares/verify-token.js';

import { cleanupTokens } from './jobs/clean-tokens.js';
import { BlogRouter } from './routes/private/blog.js';

dotenv.config({
	path: '.env',
	quiet: true,
});
const app = express();

app.use(
	cors({
		origin: `${process.env.FRONTEND_URL}`,
		credentials: true,
	})
);
app.use(express.json());
app.use(CookieParser());

cleanupTokens();

app.use('/', RefreshTokenRouter);
app.use('/', SignupRouter);
app.use('/', LoginRouter);
app.use('/user', verifyToken, BlogRouter);
app.use('/user', verifyToken, LogoutRouter);

app.listen(
	process.env.PORT,
	console.log('Listening on port: ', process.env.PORT)
);
