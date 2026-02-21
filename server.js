require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/admins', adminRoutes);


const categoryRoutes = require('./routes/categoryRoutes');

app.use('/api/categories', categoryRoutes);


const messageRoutes = require('./routes/messageRoutes');

app.use('/api/messages', messageRoutes);

const projectRoutes = require('./routes/projectRoutes');
app.use('/api/projects', projectRoutes);

// Serve uploads statically
app.use('/uploads', express.static('uploads'));

const videoRoutes = require('./routes/videoRoutes');
app.use('/api/videos', videoRoutes);

const teamMemberRoutes = require('./routes/teamRoutes');
app.use('/api/team-members', teamMemberRoutes);


const peapoleCommentsRoutes = require('./routes/peapoleCommentsRoutes');
app.use('/api/peapole-comments', peapoleCommentsRoutes);

const portfolioRoutes = require('./routes/portfolio');
app.use('/api/portfolio', portfolioRoutes);

const clientRoutes = require('./routes/clientRoutes');
app.use('/api/ourClients', clientRoutes);

// app.use(express.static(path.resolve('./public')));

// Connect DB & Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));
