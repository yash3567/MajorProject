import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    //member since july 2024 createdAt
    username: {
        type: String,
        required: true,
        unique: true,

    },
    fullName: {
        type: String,
        required: true,

    },
    password: {
        type: String,
        required: true,
        minLength: 6,

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,//reference to the user model 
            ref: 'User',
            default: []
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,//reference to the user model 
            ref: 'User',
            default: []
        }
    ],

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

    links: [{ type: String }], // Store multiple links

}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User;