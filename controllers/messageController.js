const Message = require('../models/Message');

// Create message (Public)
exports.createMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all messages (Protected)
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
