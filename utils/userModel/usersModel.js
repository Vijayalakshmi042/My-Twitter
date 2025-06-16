import mongoose from "mongoose";
//import bcrypt from "bcrypt";

const UserSchema=new mongoose.Schema({
    name:{
        type: String,
        require: true,
        unique: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    password:{
        type: String,
        require: true,
    },
    createdBy:[{type:mongoose.Schema.Types.ObjectId,ref:"TweetModel"}],
    
    resetToken: String,
    resetTokenExpiry: Date,
});

// UserSchema.pre("save",async function(next){
//     if (!this.isModified("password")) return next();
//     this.password = await bcrypt.hash(this.password,10);
// });

const UserModel = mongoose.models.users || mongoose.model('users',UserSchema)

export default UserModel;