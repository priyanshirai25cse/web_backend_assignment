import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables from .env
dotenv.config();

// Create an Express application
const app = express();

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// Root test route
app.get("/", (req, res) => {
    res.send("Welcome to my Backend Assignment!");
});

// Mount user routes at /api/users
app.use("/api/users", userRoutes);

// Configure port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas first, then start the server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
    }
};

startServer();
