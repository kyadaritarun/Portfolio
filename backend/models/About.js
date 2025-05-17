// const mongoose = require('mongoose');

// const aboutSchema = new mongoose.Schema({
//   description: {
//     type: String,
//     required: true,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('About', aboutSchema);

const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  totalProjects: {
    type: Number,
    required: true,
  },
  certifications: {
    type: Number,
    required: true,
  },
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('About', aboutSchema);