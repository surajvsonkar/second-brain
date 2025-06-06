import mongoose, { mongo, Types } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    console.error("MONGO_URI is not defined in the .env file");
    process.exit(1);
  }

mongoose.connect(mongoUri)
.then(()=> {
    console.log("db connected")
})
.catch((error)=> {
    console.log(error)
})

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: true,
        required: true
    }, 
    password: {
        type: String,
        required: true
    }
})

const tagSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        unique: true
    }
})

const contentTypes = ['twitter', 'youtube']

const contentSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: contentTypes,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tags: [{
        type: mongoose.Types.ObjectId,
        ref: "Tag"
    }],
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const linkSchema = new mongoose.Schema({
    hash: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    }
})

export const User = mongoose.model("User", userSchema)
export const Tag = mongoose.model("Tag", tagSchema)
export const Link = mongoose.model("Link", linkSchema)
export const Content = mongoose.model("Content", contentSchema)
