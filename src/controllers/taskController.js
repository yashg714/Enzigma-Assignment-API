const Task = require('../modals/task');

// require('dotenv').config();

const getAllTasks = async(req,res) =>{
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            msg : "Error in fetching tasks from DB.",
            errorMsg : error.message 
        })
    }
}

const createTask = async(req,res) =>{
    const { userId, status, dueDate,priority ,description } = req.body;
    const task = new Task({ userId, status, dueDate,priority ,description });
    try {
        await task.save();
        res.status(200).json({
            msg : "Task added successfully"
        });
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            msg : "Unable to Add Task.",
            errorMsg : error.message 
        })
    }
}

const updateTask = async(req,res) =>{
    if(!req.params.id)
        return res.status(404).json({ msg: 'Task Id not found' });
    try {
        const updatedTask = await Task.findOneAndUpdate(
            { taskId : req.params.id },
            req.body,
            { new: true, runValidators: true }
          );
        if(!updatedTask)
            return res.status(404).json({ msg: 'Task not found' });

        res.status(200).json({
            msg : "Task updated successfully",
            task : updatedTask
        });
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            msg : "Error in Updating Task",
            errorMsg : error.message 
        })
    }
}

const deleteTask = async(req,res) =>{
    if(!req.params.id)
        return res.status(404).json({ msg: 'Task Id not found' });
    try {
        const deletedTask = await Task.findOneAndDelete({ 
            taskId : req.params.id
        });
        if(!deletedTask)
            return res.status(404).json({ msg: 'Task not found' });

        res.status(200).json({
            msg : "Task deleted successfully",
            task : deletedTask
        });
    } catch (error) {
        console.error(error.message)
        res.status(500).json({
            msg : "Error in deleting Task",
            errorMsg : error.message 
        })
    }
}

module.exports = { getAllTasks,createTask,updateTask,deleteTask }