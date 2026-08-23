import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("MONGO_URI não definida no .env");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("Êxito MongoDB");
  } catch (error) {
    console.error("Falha ao conectar com MongoDB:", error);
  }
};
