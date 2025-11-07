import express from 'express';
import { BlogController } from '../../controllers/private/blog.js';

export const BlogRouter = express.Router();
BlogRouter.get('/blogs', BlogController);
