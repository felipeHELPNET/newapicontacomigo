import mongoose from "mongoose";

function connectDatabase() {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB CONECTADO!"))
    .catch((err) => console.log(`Erro ao conectar-se com o DB: ${err}`));
}

export default connectDatabase;
