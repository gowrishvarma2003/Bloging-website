import { text } from "express";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const data = new Schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    }
},{timestamps:true})

const blogs = mongoose.model('blogs', data);

export default blogs;