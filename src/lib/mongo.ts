// src/lib/mongo.ts

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('❌ Не указан MONGODB_URI в .env');
}

// Подключение к MongoDB (если не подключён)
export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(MONGODB_URI, {
    dbName: 'dominummeta',
  });
}
