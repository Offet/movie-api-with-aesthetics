//  importing model, Schema and types from mongoose
import { model, Schema, Types } from "mongoose";

// import bcrypt to help encrypt the details
import bcrypt from "bcrypt";

// defining a user schema 
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});


//  pre save to hash oa
userSchema.pre("save", async (next) => {
    if (!this.isModified("password")) 
        return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});


//  create and export a user model
export const userModel = model("User", userSchema);