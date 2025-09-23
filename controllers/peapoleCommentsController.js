const PeapoleComments = require('../models/peapoleComments');

exports.createComment = async (req, res) => {
  try {
    const { name,message , position } = req.body;

    if (!name) return res.status(400).json({ message: 'Name is required' });

        let images = [];
       if (req.files && req.files.length > 0) {
      images = req.files.map(file => `/uploads/${file.filename}`);
    } else if (req.body.images) {
      images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    }

    const member = new PeapoleComments({ name, message, position, images });
    await member.save();

    res.status(201).json({ message: 'PeapoleComments member created', member });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, message, position } = req.body;

    const updateData = { name, message, position };

     if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => `/uploads/${file.filename}`);
    } else if (req.body.images) {
      updateData.images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    }

    const updated = await PeapoleComments.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) return res.status(404).json({ message: 'PeapoleComments member not found' });

    res.json({ message: 'PeapoleComments member updated', member: updated });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PeapoleComments.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: 'PeapoleComments member not found' });

    res.json({ message: 'PeapoleComments member deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getAllComments= async (req, res) => {
  try {
    const members = await PeapoleComments.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getCommentsById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await PeapoleComments.findById(id);

    if (!member) return res.status(404).json({ message: 'PeapoleComments member not found' });

    res.json(member);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
