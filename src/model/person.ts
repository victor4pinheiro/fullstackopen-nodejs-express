import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

export default mongoose.model("Person", personSchema);
