import { MongoClient } from "mongodb";

let cachedDb = null;

export async function connectMongodb() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI);

  const db = client.db(process.env.MONGO_DB_NAME);

  cachedDb = db;
  return db;
}
