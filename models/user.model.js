const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstname:{type:String, required:true},
    lastname:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    role:{type:String, enum:['admin', 'user'], default:'user'},
    profilePicture:{type:String},

}, {timestamps:true, strict:"throw"})

const UserModel = mongoose.model("user", UserSchema)

module.exports=UserModel