const mongoose = require('mongoose');
const dotenv = require('dotenv');
const TechStack = require('./models/TechStack');

dotenv.config();

const techStacks = [
  { name: "React", icon: "/assets/icons/react.png" },
  { name: "Node.js", icon: "/assets/icons/nodejs.png" },
  { name: "MongoDB", icon: "/assets/icons/mongodb.png" },
  { name: "Tailwind CSS", icon: "/assets/icons/tailwind.png" },
  { name: "JavaScript", icon: "/assets/icons/javascript.png" },
  { name: "Python", icon: "/assets/icons/python.png" },
  { name: "Express", icon: "/assets/icons/express.png" },
  { name: "Java", icon: "/assets/icons/java.png" },
  { name: "MySQL", icon: "/assets/icons/mysql.png" },
  { name: "Bootstrap", icon: "/assets/icons/bootstrap.png" },
  { name: "HTML", icon: "/assets/icons/html.png" },
  { name: "CSS", icon: "/assets/icons/css.png" },
];

async function seedTechStacks() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    await TechStack.deleteMany({});
    console.log('Cleared existing tech stacks');

    await TechStack.insertMany(techStacks);
    console.log('Seeded tech stacks successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding tech stacks:', error);
    mongoose.connection.close();
  }
}

seedTechStacks();