import mongoose from "mongoose";

// Step 1: Define the Schema (Blueprint of a User document)
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },
        age: {
            type: Number,
            required: [true, "Age is required"],
        },
    },
    {
        // Automatically creates and manages 'createdAt' and 'updatedAt' fields
        timestamps: true,
    }
);

// Step 2: Create the Model from the Schema
// "User" will automatically map to the collection named "users" in MongoDB
const User = mongoose.model("User", userSchema);

// Step 3: Export the Model for use in controllers
export default User;

