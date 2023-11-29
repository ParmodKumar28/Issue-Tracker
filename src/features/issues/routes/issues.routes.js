// Imports
import express from 'express';
import { createNewIssue, deleteIssueById } from '../controller/issues.controller.js';

// Create router
const issueRouter = express.Router();

// Routes
issueRouter.post('/:projectId', createNewIssue);
issueRouter.get('/delete/:issueId/:projectId', deleteIssueById);

// Export router
export default issueRouter;