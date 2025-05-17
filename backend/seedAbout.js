const mongoose = require('mongoose');
const dotenv = require('dotenv');
const About = require('./models/About');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB for seeding'))
  .catch(err => console.error('MongoDB connection error:', err));

const seedAbout = async () => {
  try {
    await About.deleteMany({});
    const about = new About({
      description: 'Versatile Full-Stack Developer with a Bachelor’s degree in Computer Science and Engineering, specializing in front-end and back-end development. I have Experienced in working with HTML, CSS, JavaScript, React.js, and Bootstrap for building dynamic user interfaces, along with Java, Spring Boot, Servlets, JDBC, and MySQL for backend development.',
    });
    await about.save();
    console.log('About data seeded successfully');
  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedAbout();