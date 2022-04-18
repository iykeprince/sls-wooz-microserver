import * as dotenv from "dotenv";
dotenv.config({ path: "./../../env" });
import mongoose from "mongoose";
mongoose.Promise = global.Promise;
// import { MongoClient } from "mongodb";
// require('dotenv').config({ path: './variables.env' });

let cachedDb = null;

export async function connectMongodb() {
  if (cachedDb) {
    return cachedDb;
  }

  console.log("mongo db connection uri", process.env.MONGODB_URI);
  const db = await mongoose.connect(
    "mongodb+srv://woozeee:IZU9Q2Iq7Gu9g2sM@woozeeecluster0.csi2j.mongodb.net/production?retryWrites=true&w=majority"
  );

  // const db = client.db(process.env.MONGO_DB_NAME);
  cachedDb = db;
  return db;
}
