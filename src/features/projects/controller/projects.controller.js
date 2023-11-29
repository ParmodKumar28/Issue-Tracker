// This a controller file for the projects which handles all projects repository and views between communications.

// Imports
import { projectIssues } from "../../issues/model/issues.repository.js";
import { createProject, getProject, remove, update} from "../model/projects.repository.js";
import ProjectModel from "../model/projects.schema.js";

// Function to create one project here.
export const createNewProject = async (req,res,next)=>{
    const {name, description, author} = req.body;
    try {
        const newProject = await createProject({name, description, author});
        let notification;
        if(newProject)
        {
            notification = "Your project added successfully.";
        }
        const projects = ProjectModel.find().sort({createdAt: -1});
        res.render('home', {projects:  projects, notification: notification, search: false});
    } catch (error) {
        next(error);
    }
}

// Function to get project by id.
export const getOneProject = async(req,res,next)=>{
    try {
        const projectId = req.params.i;
        const project = await getProject(projectId);
        const issues = await projectIssues(projectId);
        res.render('project-details', {project, issues, notification: null});
    } catch (error) {
        next(error);
    }
}

// Function to delete a project
export const deleteProject = async(req,res,next)=>{
    try {
        const projectId = req.params.id;
        const isDeleted = await remove(projectId);
        let notification;
        if(isDeleted)
        {
            notification = "project deleted successfuly."
        }
        const projects = ProjectModel.find().sort({createdAt: -1});
        res.render('home', {projects:  projects, notification: notification, search: false});
    } catch (error) {
        next(error);
    }
}

//  Function to update  a project
export const updateProject = async(req,res,next)=>{
    try {
        const projectId = req.params.id;
        const data = req.body;
        const isUpdated = await update(data, projectId);
        let notification;
        if(isUpdated)
        {
            notification = "project updated successfuly."
        }
        const projects = ProjectModel.find().sort({createdAt: -1});
        res.render('home', {projects:  projects, notification: notification, search: false});
    } catch (error) {
        next(error);
    }
}

// Function to search projects
export const search =  async (req, res) => {
    try {
      const { searchQuery } = req.query;
      const projects = await ProjectModel.find({ name: { $regex: searchQuery, $options: 'i' } });
      res.render('home', { projects ,notification: false, search: true});
    } catch (error) {
        next(error);
    }
}