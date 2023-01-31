import mongoose from "mongoose";

const url = process.env.MONGODB_URI;

class Database {
  static async connect() {
    const client = await mongoose.connect(url);
    return client.connection;
  }
}

export default Database;
