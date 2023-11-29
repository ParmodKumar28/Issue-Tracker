// Issues controller file is here all repository and views communications functions are here all.

// Imports
import { add, deleteIssue } from "../model/issues.repository.js";
import { getProject } from "../../projects/model/projects.repository.js";
import { projectIssues } from "../model/issues.repository.js";
import { ObjectId } from "mongodb";
import IssueModel from "../model/issues.schema.js";

// Function to create a new issue on the project.
export const createNewIssue = async(req,res,next)=>{
    try {
        const { title, description, author, labels } = req.body;
        const projectId = req.params.projectId;

        // Extract labels from the request body and convert to an array
        const labelsArray = Array.isArray(labels) ? labels : [labels];

        const newIssue = await add({ title, description, author, labels: labelsArray }, projectId);
        let notification;
        if (newIssue) {
            notification = "Issue created successfully.";
        }
        const project = await getProject(projectId);
        const issues = await projectIssues(projectId);
        res.render('project-details', { project, issues, notification });
    } catch (error) {
      next(error);
    }
}

// Function to filter the issues in the projects.
export const getFilteredIssues = async (req, res, next) => {
  try {
    const { labels, author, title, description } = req.query;
    const projectId = req.params.id;

    let filter = { project: new ObjectId(projectId) };

    if (labels) {
      filter.labels = { $all: labels.split(',') };
    }

    if (author) {
      filter.author = author;
    }

    if (title) {
      filter.title = { $regex: new RegExp(title, 'i') };
    }

    if (description) {
      filter.description = { $regex: new RegExp(description, 'i') };
    }

    const issues = await IssueModel.find(filter);
    const project = await getProject(projectId);

    if (issues.length === 0) {
      return res.render('project-details', { project, issues, notification: "No matching issues found." });
    }
    return res.render('project-details', { project, issues, notification: "Filtered or searched issues." });
    
  } catch (error) {
    next(error);
  }
};

// Function to delete a issue.
export const deleteIssueById = async(req,res,next)=>{
  try {
    const issueId = req.params.issueId;
    const projectId = req.params.projectId;
    const isDeleted = await deleteIssue(issueId);
    let notification;
    if(isDeleted)
    {
      notification = "Issue deleted successfully."
    }
    // Rendring issues
    const issues = await projectIssues(projectId);
    const project = await getProject(projectId);
    return res.render('project-details', { project, issues, notification});
  } catch (error) {
    next(error);
  }
}


  
