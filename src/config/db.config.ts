import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/";
const dbName = process.env.DB_NAME || "gspann";

const connectDB = async () => {
  try {
    mongoose.connect(MONGO_URI, {
      dbName: dbName,
    });
    console.log(`MongoDB connected`);
  } catch (error) {
    console.log(`MongoDB connection error `, error);
  }
};

export default connectDB;
