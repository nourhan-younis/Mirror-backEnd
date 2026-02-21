const express = require('express')
const router = express.Router()
const {
  upload,
  createClient,
  getClients,
  deleteClient
} = require('../controllers/clientController')

// Upload single logo
router.post('/', upload.single('logo'), createClient)

// Get all clients
router.get('/', getClients)

// Delete
router.delete('/:id', deleteClient)

module.exports = router