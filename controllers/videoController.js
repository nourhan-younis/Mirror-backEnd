const fs = require('fs');
const path = require('path');

exports.uploadVideo = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.status(201).json({ message: 'Video uploaded', filename: req.file.filename });
};

exports.deleteVideo = async (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, '../uploads/videos/', filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json({ message: 'Video deleted' });
  });
};

// ✅ New: Get all videos
exports.getVideos = async (req, res) => {
  const dirPath = path.join(__dirname, '../uploads/videos/');
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error', error: err });
    }
    // Only return video files
    const videos = files.filter(file => /\.(mp4|mov|avi|mkv)$/i.test(file));
    res.json({ videos });
  });
};
