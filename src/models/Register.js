import mongoose from "mongoose";

const RegistersSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  nature: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: Array,
    required: true,
  },
  comments: {
    type: Array,
    requied: true,
  },
});

const Registers = mongoose.model("Register", RegistersSchema);

export default Registers;
