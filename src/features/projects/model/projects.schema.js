// Creating schema for projects here.
import mongoose from "mongoose";

const projectsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        maxlength: [500, 'Description is too long']
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    issues: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Issue'
        }
    ]
});

// Model
const ProjectModel = mongoose.model('Project', projectsSchema);
export default ProjectModel;