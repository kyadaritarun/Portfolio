const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const techStacks = require("./models/TechStack");
const About = require('./models/About');
const path = require("path");
dotenv.config();

const app = express();

const _diname = path.resolve();

// Middleware

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.static(path.join(_diname,"/frontend/dist")));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));


// // Routes
// // Get About Description
// app.get('/api/about', async (req, res) => {
//   try {
//     const about = await About.findOne();
//     if (!about) {
//       return res.status(404).json({ message: 'About data not found' });
//     }
//     res.json(about);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// // Update or Create About Description
// app.put('/api/about', async (req, res) => {
//   try {
//     const { description } = req.body;
//     if (!description) {
//       return res.status(400).json({ message: 'Description is required' });
//     }
//     const about = await About.findOneAndUpdate(
//       {},
//       { description, updatedAt: Date.now() },
//       { new: true, upsert: true }
//     );
//     res.json(about);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });
// Routes
// Get About Data
app.get('/api/about', async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: 'About data not found' });
    }
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update or Create About Data
app.put('/api/about', async (req, res) => {
  try {
    const { description, totalProjects, certifications, yearsOfExperience } = req.body;
    if (!description || totalProjects == null || certifications == null || yearsOfExperience == null) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const about = await About.findOneAndUpdate(
      {},
      { description, totalProjects, certifications, yearsOfExperience, updatedAt: Date.now() },
      { new: true, upsert: true }
    );
    res.json(about);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model('Contact', contactSchema);


// Project Schema
const projectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  Img: { type: String, required: true },
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  Link: { type: String, required: true },
  TechStack: { type: [String], required: true },
  Features: { type: [String], required: true },
  Github: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Project = mongoose.model('Project', projectSchema);

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save to MongoDB
    const contact = new Contact({ name, email, message });
    await contact.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Get All Projects Endpoint
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Create Project Endpoint (for adding new projects)
app.post('/api/projects', async (req, res) => {
  try {
    const { id, Img, Title, Description, Link, TechStack, Features, Github } = req.body;

    // Validate input
    if (!id || !Img || !Title || !Description || !Link || !TechStack || !Features || !Github) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save to MongoDB
    const project = new Project({ id, Img, Title, Description, Link, TechStack, Features, Github });
    await project.save();

    res.status(201).json({ message: 'Project added successfully', project });
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findOne({ id: req.params.id });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// New TechStack Routes
app.get('/api/techstacks', async (req, res) => {
  try {
    const techStacks = await TechStack.find().sort({ createdAt: -1 });
    res.status(200).json(techStacks);
  } catch (error) {
    console.error('Error fetching tech stacks:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get ( "/",(req,res) => {
    res.send({
      activeStatus:true,
      error:false,
    })
});

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));