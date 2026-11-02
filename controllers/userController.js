import mongoose from "mongoose";
import User from "../models/userModel.js";

// Helper function to handle common Mongoose errors
const handleErrors = (res, error) => {
    // 1. MongoDB Duplicate Key Error (e.g. duplicate email)
    if (error.code === 11000) {
        return res.status(400).json({
            message: "Email already exists. Please use a unique email.",
        });
    }

    // 2. Invalid MongoDB ObjectId format
    if (error.name === "CastError") {
        return res.status(400).json({
            message: "Invalid User ID format.",
        });
    }

    // 3. Mongoose Schema Validation Error (e.g. missing required field)
    if (error.name === "ValidationError") {
        return res.status(400).json({
            message: error.message,
        });
    }

    // 4. Fallback General Server Error
    return res.status(500).json({
        message: "Server error occurred",
        error: error.message,
    });
};

// ==========================================
// 1. CREATE USER (POST /api/users)
// ==========================================
export const createUser = async (req, res) => {
    try {
        const { name, email, age } = req.body;

        // Check if all required fields are provided
        if (!name || !email || !age) {
            return res.status(400).json({
                message: "Please provide name, email, and age.",
            });
        }

        // Create and save new user in MongoDB
        const newUser = await User.create({ name, email, age });

        // 201 Created: user successfully created
        res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });
    } catch (error) {
        handleErrors(res, error);
    }
};

// ==========================================
// 2. GET ALL USERS (GET /api/users)
// ==========================================
export const getUsers = async (req, res) => {
    try {
        // Retrieve all user documents from MongoDB
        const users = await User.find();

        // 200 OK: return list of users
        res.status(200).json({
            count: users.length,
            users,
        });
    } catch (error) {
        handleErrors(res, error);
    }
};

// ==========================================
// 3. GET SINGLE USER BY ID (GET /api/users/:id)
// ==========================================
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid User ID format.",
            });
        }

        // Find user by ID in MongoDB
        const user = await User.findById(id);

        // 404 Not Found if user does not exist
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        // 200 OK: return user
        res.status(200).json(user);
    } catch (error) {
        handleErrors(res, error);
    }
};

// ==========================================
// 4. UPDATE USER BY ID (PUT /api/users/:id)
// ==========================================
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid User ID format.",
            });
        }

        // Update user:
        // { new: true } returns the modified document rather than the original
        // { runValidators: true } ensures updates respect schema rules
        const updatedUser = await User.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        // 404 Not Found if user does not exist
        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found to update.",
            });
        }

        // 200 OK: return updated user
        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        handleErrors(res, error);
    }
};

// ==========================================
// 5. DELETE USER BY ID (DELETE /api/users/:id)
// ==========================================
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid User ID format.",
            });
        }

        // Delete user by ID from MongoDB
        const deletedUser = await User.findByIdAndDelete(id);

        // 404 Not Found if user does not exist
        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found to delete.",
            });
        }

        // 200 OK: return success confirmation
        res.status(200).json({
            message: "User deleted successfully",
            deletedUserId: id,
        });
    } catch (error) {
        handleErrors(res, error);
    }
};

