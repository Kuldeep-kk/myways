import mongoose, {Schema} from "mongoose";

const UserSchema=new Schema({
    name:{
        type:String,
        required:[true,"Name Required"],
    },
    email:{
        type:String,
        required:[true,"email Required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password Required"],
    },
    hint:{
        type:String,
    },
    profileIsMale:Boolean,
    public_id:String,
    secure_url:String



});
export const User=
    mongoose.models.users || mongoose.model("users",UserSchema);