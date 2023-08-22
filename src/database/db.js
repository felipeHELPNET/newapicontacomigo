import mongoose from "mongoose";

async function connectDatabase() {

    try {

        await mongoose.connect(process.env.MONGODB_URI)

        console.log("MondoDB OK")

    } catch (error) {

        console.log(error)
    }

}


export default connectDatabase;