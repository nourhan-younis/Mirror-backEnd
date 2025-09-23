const Project = require('../models/Project');
const path = require('path');

exports.createProject = async (req, res) => {
  try {
    const {
      name,
      location,
      customerName,
      projectCost,
      projectTime,
      scopeOfWork,
      category,
      description
    } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    let images = [];

    if (req.files && req.files.length > 0) {
      images = req.files.map(file => `/uploads/${file.filename}`);
    } else if (req.body.images) {
      images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    }

    const project = new Project({
      images,
      name,
      location,
      customerName,
      projectCost,
      projectTime,
      scopeOfWork,
      category,
      description
    });

    await project.save();

    res.status(201).json({ message: 'Project created', project });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// UPDATE
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      location,
      customerName,
      projectCost,
      projectTime,
      scopeOfWork,
      category,
      description
    } = req.body;

    const updateData = {
      name,
      location,
      customerName,
      projectCost,
      projectTime,
      scopeOfWork,
      category,
      description
    };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => `/uploads/${file.filename}`);
    } else if (req.body.images) {
      updateData.images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    }

    const updated = await Project.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) return res.status(404).json({ message: 'Project not found' });

    res.json({ message: 'Project updated', project: updated });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// GET ALL with filter & pagination
exports.getAllProjects = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;

    const query = {};

    if (category) {
      query.category = category;
    }

    const projects = await Project.find(query)
      .populate('category', 'name') // include category name
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Project.countDocuments(query);

    res.json({
      projects,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit)
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// GET by ID
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id).populate('category', 'name');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};



// UPDATE


// DELETE
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Project.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Project not found' });

    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
