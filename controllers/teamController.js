const Team = require('../models/Team');

exports.createTeam = async (req, res) => {
  try {
    const { name, description, linkedIn, whatsapp, email } = req.body;

    if (!name) return res.status(400).json({ message: 'Name is required' });

        let images = [];
       if (req.files && req.files.length > 0) {
      images = req.files.map(file => `/uploads/${file.filename}`);
    } else if (req.body.images) {
      images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    }

    const member = new Team({ name, description, linkedIn, whatsapp, email, images });
    await member.save();

    res.status(201).json({ message: 'Team member created', member });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, linkedIn, whatsapp, email } = req.body;

    const updateData = { name, description, linkedIn, whatsapp, email };

     if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => `/uploads/${file.filename}`);
    } else if (req.body.images) {
      updateData.images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    }

    const updated = await Team.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) return res.status(404).json({ message: 'Team member not found' });

    res.json({ message: 'Team member updated', member: updated });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Team.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: 'Team member not found' });

    res.json({ message: 'Team member deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAllTeam = async (req, res) => {
  try {
    const members = await Team.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Team.findById(id);

    if (!member) return res.status(404).json({ message: 'Team member not found' });

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
