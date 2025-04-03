import mongoose from "mongoose";
import { getEnvOrThrow } from "../utils/getEnvOrThrow"; // путь подкорректируй если нужно

const MONGO_URI = getEnvOrThrow("MONGO_URL");

// eslint-disable-next-line no-var
declare global {
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

global.mongooseCache = global.mongooseCache || { conn: null, promise: null };

async function dbConnect(): Promise<typeof mongoose> {
  if (global.mongooseCache.conn) return global.mongooseCache.conn;

  if (!global.mongooseCache.promise) {
    global.mongooseCache.promise = mongoose.connect(MONGO_URI, {
      bufferCommands: false,
    });
  }

  global.mongooseCache.conn = await global.mongooseCache.promise;
  return global.mongooseCache.conn;
}

export default dbConnect;
