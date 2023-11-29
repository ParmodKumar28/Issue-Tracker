// Issues repository is here all database code for issues is here.

// Imports
import { ObjectId } from "mongodb";
import IssueModel from "./issues.schema.js"

// Function to add a new issue on a project.
export const add = async(data, projectId)=>{
    const newIssue = new IssueModel(data);
    newIssue.project = new ObjectId(projectId);
    return await newIssue.save();
}

// Function to get issues by the project id.
export const projectIssues = async(projectId)=>{
    const issues = await IssueModel.find({project: new ObjectId(projectId)});
    return issues;
}

// Funcyion to delete a issue with its id.
export const deleteIssue = async(id)=>{
    return await IssueModel.findByIdAndDelete(id);
}