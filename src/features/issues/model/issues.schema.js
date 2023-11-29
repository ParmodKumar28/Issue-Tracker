// Creating schema for the issues of the projects.
import mongoose from "mongoose";

const issuesSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: [2, 'Minimum length of the issue title is 2'],
        maxlength: [100, 'Maximum length of the issue title is 100'],
        required: true
    },
    description: {
        type: String,
        minlength: [10, 'Minimum length of the issue description is 10'],
        maxlength: [1000, 'Maximum length of the issue description is 1000'],
        required: true,
    },
    labels: [
        {
            type: String
        }
    ],
    author: {
        type: String,
        required: true
    },
    project: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Project'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Model
const IssueModel = mongoose.model('Issue', issuesSchema);
export default IssueModel;