import mongoose from "mongoose";

class Database {
  static async connect() {
    const url = process.env.MONGODB_URI;
    const client = await mongoose.connect(url);
    return client.connection;
  }
}

export default Database;
