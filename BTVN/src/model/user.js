import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username :{
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase:  true,

    },
    email:{
        type: String,
        require: true,
        minlength: 6,

    },
    age:{
        type: Number,
    },
}, {timestamps: true, versionKey: false});
userSchema.index({username:1, email: 1});
export default mongoose.model('user', userSchema);