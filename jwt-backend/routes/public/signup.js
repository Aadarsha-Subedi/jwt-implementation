import express from 'express';
import { SignupController } from '../../controllers/public/signup.js';

export const SignupRouter = express.Router();
SignupRouter.post('/signup', SignupController);
