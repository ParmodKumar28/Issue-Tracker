// Home controller file is here all functions are here.

// Imports
import ProjectModel from "../../projects/model/projects.schema.js";

// Function to get all projects.
export const getProjects = async (req,res,next)=>{
    try {
        const projects = await ProjectModel.find().sort({createdAt: -1});
        let notifictaion;
        if(!projects || projects.length == 0)
        {
            notifictaion = "There are no projects let's add.";
        }
        res.render('home', {projects: projects, notification: notifictaion, search: false});
    } catch (error) {
        next(error);
    }
}