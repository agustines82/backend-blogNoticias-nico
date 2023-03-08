import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        require: true,
        lowercase: true,
    },
    pass: {
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    repeatPass: {
        type: String,
        require: true,
        lowercase: true,
        trim: true,
    },
    token: {
        type: String,
        default: "",
    },
    rol: {
        type: String,
        default: "user",
    },
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;