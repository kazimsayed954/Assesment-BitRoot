import mongoose from "mongoose";
import { configDotenv } from 'dotenv';

configDotenv();

const MONGODB_URI = process.env.MONGODB_URI as string;

class Database {
    private static instance: Database;
    private constructor() {}

    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public connect(): void {
        mongoose
            .connect(MONGODB_URI)
            .then(() => {
                console.log("Connected to MongoDB");
            })
            .catch((err) => {
                console.error("Failed to connect to MongoDB", err);
            });
    }
}

export default Database.getInstance();
