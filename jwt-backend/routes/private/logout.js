import express from 'express';
import { LogoutController } from '../../controllers/private/logout.js';

export const LogoutRouter = express.Router();
LogoutRouter.post('/logout', LogoutController);
