const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 5000;

// Allow CORS (Cross-Origin Resorce Sharing)
app.use(cors());

// Set up storage engine with Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append extension
    }
});

// File upload middleware
const upload = multer({ storage });

// Handle file uploads
app.post('/upload', upload.single('file'), (req, res) => { 
    if (req.file) {
        res.json({
            success: true,
            message: 'File uploaded successfully',
            file: req.file.filename
        });
    } else {
        res.status(400).json({ success: false, message: 'File upload failed' });
    }
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});