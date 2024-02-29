import mongoose from "mongoose";

var adminModel = mongoose.Schema({
    email:{
        type : String,
        required : true,
        unique : true
    },
    password:{
        type : String,
        required : true
    }
});

const admin = mongoose.model('admin',adminModel,'admin');
export default admin;