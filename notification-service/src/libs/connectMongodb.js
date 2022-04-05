import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
mongoose.Promise = global.Promise;
// import { MongoClient } from "mongodb";
// require('dotenv').config({ path: './variables.env' });

let cachedDb = null;

export async function connectMongodb() {
  if (cachedDb) {
    return cachedDb;
  }
  const db = await mongoose.connect(process.env.MONGODB_URI);

  // const db = client.db(process.env.MONGO_DB_NAME);
  cachedDb = db;
  return db;
}
