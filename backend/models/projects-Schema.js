const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    projectname: {
      type: String,
      required: true,
    },
    abstract: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    techused: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
    },
    type: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    projectfile: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const projects = mongoose.model("projects", projectSchema);
module.exports = projects;
