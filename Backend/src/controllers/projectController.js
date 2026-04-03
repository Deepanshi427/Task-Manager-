const Project = require("../models/Project");

// Create
exports.createProject = async (req, res) => {
    const project = await Project.create({
        title: req.body.title,
        description: req.body.description,
        user: req.user._id
    });

    res.json(project);
};

// Get all (user-specific)
exports.getProjects = async (req, res) => {
    const projects = await Project.find({ user: req.user._id });
    res.json(projects);
};

// Get single project by ID
exports.getProject = async (req, res) => {
    const project = await Project.findOne({
        _id: req.params.id,
        user: req.user._id
    });

    if (!project) return res.status(404).json({ message: "Project not found" });

    res.json(project);
};

// Update
exports.updateProject = async (req, res) => {
    const project = await Project.findOne({
        _id: req.params.id,
        user: req.user._id
    });

    if (!project) return res.status(404).json({ message: "Not found" });

    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;

    await project.save();
    res.json(project);
};

// Delete
exports.deleteProject = async (req, res) => {
    const project = await Project.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
    });

    if (!project) return res.status(404).json({ message: "Not found" });

    res.json({ message: "Project deleted" });
};