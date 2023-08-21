import mongoose from "mongoose";

async function connectDatabase() {

    try {

        await mongoose.connect('mongodb+srv://contacomigo:Zyg6fUDpVAZMRl32@cluster0.bcizinl.mongodb.net/?retryWrites=true&w=majority')

        console.log("MondoDB OK")

    } catch (error) {

        console.log(error)
    }

}


export default connectDatabase;