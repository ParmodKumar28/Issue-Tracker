// Importing dotenv
import './env.js';

// Imports
import express from 'express';
import ejs from 'ejs';
import ejsLayouts from 'express-ejs-layouts';
import path from 'path';
import connectUsingMongoose from './config/mongooseConfig.js';

// Routers imported
import homeRouter from './src/features/home/routes/home.routes.js';
import issueRouter from './src/features/issues/routes/issues.routes.js';
import projectsRouter from './src/features/projects/routes/projects.routes.js';
import mongoose from 'mongoose';


// Creating Server
const app = express();

// Parsing form data.
app.use(express.urlencoded({ extended: true }));

// View Engine
app.set('view engine', 'ejs');
// Views Path
app.set('views', path.join(path.resolve('src', 'views')));

// Middleware for Ejs Layouts
app.use(ejsLayouts);
app.use(express.static('src/views'));
app.use(express.static('public'));

// Routes
app.use('/api/home', homeRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/issues', issueRouter);

// Error Handler Middleware
app.use((err,req,res,next)=>{
    console.log(err);
    if(err instanceof mongoose.Error.ValidationError)
    {
        return res.render("404page", {errorMessage: err.message});
    }
    return res.render("404page", {errorMessage: "Something went wrong at server side."});
});


// Port
const PORT = process.env.PORT;
// Listening on server
app.listen(PORT, ()=>{
    console.log(`Server is listening on localhost:${PORT}`);
    connectUsingMongoose();
})