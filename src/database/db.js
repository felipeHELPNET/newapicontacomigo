import mongoose from "mongoose";

async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log(error);
  }
}

export default connectDatabase;
