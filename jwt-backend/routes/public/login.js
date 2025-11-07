import express from 'express';
import { LoginController } from '../../controllers/public/login.js';

export const LoginRouter = express.Router();
LoginRouter.post('/login', LoginController);
