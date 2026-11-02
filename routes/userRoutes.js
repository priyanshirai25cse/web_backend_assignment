import express from "express";
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} from "../controllers/userController.js";

// Create an Express router instance
const router = express.Router();

// Route definitions for User entity
// Base route mounted at "/api/users" in index.js

// 1. Create a new user (POST /api/users)
router.post("/", createUser);

// 2. Get all users (GET /api/users)
router.get("/", getUsers);

// 3. Get a single user by MongoDB ID (GET /api/users/:id)
router.get("/:id", getUserById);

// 4. Update an existing user by MongoDB ID (PUT /api/users/:id)
router.put("/:id", updateUser);

// 5. Delete a user by MongoDB ID (DELETE /api/users/:id)
router.delete("/:id", deleteUser);

export default router;

