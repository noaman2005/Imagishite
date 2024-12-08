import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

interface GlobalWithMongoose extends Global {
  mongoose?: MongooseConnection;
}

let cached: MongooseConnection = (global as GlobalWithMongoose).mongoose || { conn: null, promise: null };

if(!cached) {
  cached = (global as GlobalWithMongoose).mongoose = { 
    conn: null, 
    promise: null 
  }
}

export const connectToDatabase = async () => {
  if(cached.conn) return cached.conn;

  if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise = 
    cached.promise || 
    mongoose.connect(MONGODB_URL, { 
      dbName: 'Imaginify', bufferCommands: false 
    })

  cached.conn = await cached.promise;

  return cached.conn;
}