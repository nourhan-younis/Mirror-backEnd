const Category = require('../models/Category');

// Create category
exports.createCategory = async (req, res) => {
  try {
    const { categoryId, name } = req.body;

    const exists = await Category.findOne({ categoryId });
    if (exists) return res.status(400).json({ message: 'Category ID exists' });

    const category = new Category({ categoryId, name });
    await category.save();

    res.status(201).json({ message: 'Category created', category });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

// Get all
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

// Update
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryId, name } = req.body;

    const updated = await Category.findByIdAndUpdate(id, { categoryId, name }, { new: true });

    if (!updated) return res.status(404).json({ message: 'Category not found' });

    res.json({ message: 'Category updated', category: updated });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

// Delete
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Category not found' });

    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};
