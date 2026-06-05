
import Task from "../models/Task.js";

// create a task
export const createTask = async (req, res) => {
    try {
        const task = await Task.create({
            ...req.body,
            userId: req.user.id,
        });
        res.status(201).json(task);
    } catch(error){
        res.status(500).json({
            message: error.message,
        })
    }
};

//get all task for a user

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.status(200).json(tasks);
    } catch(error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

//get a single task by id
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });
        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

//update a task

export const updateTask = async (req, res) => {
    try{
        const task =  await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.user.id,
            },
            req.body, 
            { new : true} // to return the updated document
        );

        res.json(task);
    } catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id,
        });

        res.json(task);
    } catch(error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const toggleStatus = async (req, res) => {
    try{
        const task = await Task.findOne({
            _id: req.params.id,
            userId: req.user.id,
        });

       task.status = 
           task.status === "pending" ? "in-progress" :
       task.status === "in-progress" ? "completed" : "pending";  //toggle between the three status
       
       await task.save();
       res.json(task);
    } catch(error){
        res.status(500).json({
            message: error.message,
        });
    }
};