const Client = require('../models/Client')
const multer = require('multer')
const path = require('path')

// Storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/clients/')
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname)
    cb(null, uniqueName)
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
})

// Upload Client
const createClient = async (req, res) => {
  try {
    const { name } = req.body

    if (!req.file) {
      return res.status(400).json({ message: 'Logo is required' })
    }

    const client = await Client.create({
      name,
      logo: `/uploads/clients/${req.file.filename}`
    })

    res.status(201).json(client)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get All Clients
const getClients = async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 })
    res.json(clients)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Delete Client (optional)
const deleteClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id)
    res.json({ message: 'Client deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  upload,
  createClient,
  getClients,
  deleteClient
}