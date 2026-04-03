const Task = require("../models/Task");
const Project = require("../models/Project");

// Create task
exports.createTask = async (req, res) => {
    const project = await Project.findOne({
        _id: req.params.projectId,
        user: req.user._id
    });

    if (!project) return res.status(404).json({ message: "Project not found" });

    const task = await Task.create({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status || 'pending',
        dueDate: req.body.dueDate,
        project: project._id
    });

    res.json(task);
};

// Get tasks
exports.getTasks = async (req, res) => {
    const tasks = await Task.find({ project: req.params.projectId });
    res.json(tasks);
};

// Update task
exports.updateTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;
    task.dueDate = req.body.dueDate || task.dueDate;

    await task.save();
    res.json(task);
};

// Delete task
exports.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
};