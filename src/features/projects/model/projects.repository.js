// Projects repository file all projects database related function are here.
// Imports
import ProjectModel from "./projects.schema.js";

// Function to store a project in the database
export const createProject = async(data)=>{
    const newProject = new ProjectModel(data);
    return await newProject.save();
}

// Function to get a single project by is id.
export const getProject = async(id)=>{
    return await ProjectModel.findById(id);
}

// Function to delete the project
export const remove =  async(id)=>{
    return await ProjectModel.findByIdAndDelete(id);
}

// Function to update the prooject
export const update = async(data, id)=>{
    return await ProjectModel.findByIdAndUpdate(id, data, {
        new: true,
    });
}
