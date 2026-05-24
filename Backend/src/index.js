import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import connectDB from "./config/db.js";
import {
    errorHandler,
    notFoundHandler,
} from "./middlewares/error.middleware.js";
import handleException from "./utils/handleException.js";

dotenv.config({ override: true });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV !== "test") {
    app.use(morgan("dev"));
}

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
    });
});

app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
    await connectDB();

    const server = app.listen(PORT, () => {
        console.info(`Server is running on port ${PORT}`);
    });

    handleException(server);
};

startServer().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});

export default app;
