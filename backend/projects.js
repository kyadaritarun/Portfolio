const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

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

// Initial Projects (from projects.js)
const projects = [
  {
    id: "hyperchat",
    Img: "/assets/images/hyperchat.jpg",
    Title: "HyperChat",
    Description: "Built HyperChat, a real-time internal team communication application using React.js and Node.js with one-on-one and group chat features, real-time user status, push notifications, and message read receipts. Implemented secure authentication (JWT) and end-to-end encryption for data privacy.",
    Link: "https://hyperchat-t.onrender.com/",
    TechStack: ["React", "Node.js", "mongodb", "Tailwind CSS", "JavaScript"],
    Features: ["Real-time messaging", "User authentication", "Group chat support", "push notifications"],
    Github: "Private",
  },
  {
    id: "hospital-management",
    Img: "/images/hospital-management.jpg",
    Title: "Hospital Management System",
    Description: "Designed and developed a comprehensive system to streamline patient registration, appointment management, billing, and electronic health records, ensuring efficient hospital operations.",
    Link: "#",
    TechStack: ["Java", "Servlets", "JDBC", "MySQL", "Bootstrap", "Front-End Technologies"],
    Features: ["Patient record management", "Appointment scheduling", "Admin dashboard"],
    Github: "Private",
  },
  {
    id: "Notes-Reminder",
    Img: "#",
    Title: "Notes-Reminder",
    Description: "An online store with product listings, cart, and payment integration.",
    Link: "https://reminder-13kp.onrender.com",
    TechStack: ["React", "Node.js", "Express", "MongoDB"],
    Features: ["SMS", "CALL"],
    Github: "Private",
  },
  {
    id: "IT-Company-wed-page",
    Img: "#",
    Title: "IT-Company-wed-page",
    Description: "Ready to take your business to the next level with technology? Let’s connect! Our team is always ready to discuss your ideas, answer your questions, and explore how we can work together to achieve your goals.",
    Link: "https://kyadaritarun.github.io/IT-Company-project/",
    TechStack: ["HTML", "CSS", "Java", "MYSQL"],
    Features: [],
    Github: "Private",
  },
  {
    id: "Weather-App",
    Img: "#",
    Title: "Weather-App",
    Description: "A Weather App gives users real-time weather updates, forecasts, and alerts based on their location or a searched city/place. It helps people plan their day by showing the temperature, chance of rain, wind speed, and more.",
    Link: "https://kyadaritarun.github.io/Weather-App/",
    TechStack: ["HTML", "CSS", "Java", "MYSQL"],
    Features: ["Live weather", "Real-Time Updates"],
    Github: "Private",
  },
  {
    id: "Travel-Website-Landing-Page",
    Img: "#",
    Title: "Travel-Website-Landing-Page",
    Description: "The Travel Website Landing Page is designed to inspire visitors to explore and book trips. It features a big, beautiful hero section with a catchy heading, a search bar or call-to-action button 'Explore Now', and stunning images of top destinations.",
    Link: "https://kyadaritarun.github.io/Travel-Website-Landing-Page/",
    TechStack: ["HTML", "CSS", "Java", "MYSQL"],
    Features: ["Booking"],
    Github: "Private",
  },
  {
    id: "Stop-watch",
    Img: "#",
    Title: "Stop-watch",
    Description: "A stopwatch is a tool used to measure the exact amount of time between when an event starts and when it ends.",
    Link: "https://kyadaritarun.github.io/Stop-watch/",
    TechStack: ["HTML", "CSS", "Java", "MYSQL"],
    Features: [],
    Github: "Private",
  },
  {
    id: "Password-generator",
    Img: "#",
    Title: "Password-generator",
    Description: "A password generator creates strong, random passwords to enhance security.",
    Link: "https://kyadaritarun.github.io/Password-generator/",
    TechStack: ["HTML", "CSS", "Java", "MYSQL"],
    Features: [],
    Github: "Private",
  },
  {
    id: "To-Do-List",
    Img: "#",
    Title: "To-Do-List",
    Description: "A To-Do List is a simple app that helps users organize tasks they need to complete. It lets you add, view, complete, and delete tasks easily.",
    Link: "https://github.com/kyadaritarun/To-Do-List",
    TechStack: ["HTML", "CSS", "Java", "MYSQL"],
    Features: [],
    Github: "Private",
  },
];

// Seed Function
async function seedProjects() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('Cleared existing projects');

    // Insert new projects
    await Project.insertMany(projects);
    console.log('Seeded projects successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding projects:', error);
    mongoose.connection.close();
  }
}

// Uncomment the line below to run the seed function
// seedProjects();

module.exports = app;