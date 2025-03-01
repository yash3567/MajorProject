import mongoose from 'mongoose';

const projectUserSchema = new mongoose.Schema({
    //member since july 2024 createdAt
   
    name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
    },

    projectname: {
        type: String,
        required: true,
      },
    password: {
        type: String,
        required: true,
        minLength: 6,

    },
   
    profileImg: {
        type: String,
        default: "",

    },

    coverImg: {
        type: String,
        default: "",

    },

    bio: {
        type: String,
        default: "",

    },

    link: {
        type: String,
        default: "",

    },

}, { timestamps: true })

const ProjectUser = mongoose.model("ProjectUser", projectUserSchema);

export default ProjectUser;