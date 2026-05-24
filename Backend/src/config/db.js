import mongoose from "mongoose";

const connectDB = async () => {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        throw new Error("MONGODB_URI is not defined in .env");
    }

    const connection = await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: Number(process.env.MONGODB_TIMEOUT_MS) || 5000,
    });

    console.info(`MongoDB connected: ${connection.connection.host}`);
    return connection;
};

export default connectDB;
