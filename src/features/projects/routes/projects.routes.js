// Imports
import express from 'express';
import { createNewProject, getOneProject, updateProject, deleteProject } from '../controller/projects.controller.js';
import { getFilteredIssues } from '../../issues/controller/issues.controller.js';

// Create router
const projectsRouter = express.Router();

// Routes
projectsRouter.post('/', createNewProject);
projectsRouter.get('/:id', getOneProject);
projectsRouter.get('/filtered/:id', getFilteredIssues);
projectsRouter.post('/update/:id', updateProject);
projectsRouter.get('/delete/:id', deleteProject);

// Export router
export default projectsRouter;