import express from 'express';
import { RefreshTokenController } from '../../controllers/token/refresh-token.js';

export const RefreshTokenRouter = express.Router();

RefreshTokenRouter.post('/refresh', RefreshTokenController);
