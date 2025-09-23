const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Create new admin
exports.createAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const exists = await Admin.findOne({ username });
    if (exists) return res.status(400).json({ message: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({ username, password: hashedPassword });
    await admin.save();

    res.status(201).json({ message: 'Admin created', admin: { id: admin._id, username: admin.username } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

// Login
exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, admin.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token , username});
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

// Update admin
exports.updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password } = req.body;

    const update = {};
    if (username) update.username = username;
    if (password) update.password = await bcrypt.hash(password, 10);

    const updated = await Admin.findByIdAndUpdate(id, update, { new: true });

    if (!updated) return res.status(404).json({ message: 'Admin not found' });

    res.json({ message: 'Admin updated', admin: updated });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

// Delete admin
exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Admin.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Admin not found' });

    res.json({ message: 'Admin deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};
