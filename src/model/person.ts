import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, "name required"],
  },
  number: {
    type: String,
    minLength: [8, "phone number is too short"],
    match: [/^\d{2,3}-\d+$/, "phone number is invalid"],
    required: [true, "person phone number required"],
  },
});

export default mongoose.model("Person", personSchema);
