import mongoose from "mongoose";

const url = process.env.MONGODB_URI;

class Database {
  static async connect() {
    return await mongoose.connect(url);
  }

  static async disconnect() {
    return await mongoose.disconnect();
  }
}

export default Database;
