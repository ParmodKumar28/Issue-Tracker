// Imports
import express from 'express';
import { getProjects } from '../controller/home.controller.js';
import { search } from '../../projects/controller/projects.controller.js';

// Create router
const homeRouter = express.Router();

// Routes
homeRouter.get('/', getProjects);
homeRouter.get('/search', search);

// Export router
export default homeRouter;