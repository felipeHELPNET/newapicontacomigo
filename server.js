import express from "express";
import connectDatabase from "./src/database/database.js";
import dotenv from "dotenv";
import userRoute from "./src/routes/user.route.js";
import authRoute from "./src/routes/auth.route.js";
import registerRouter from "./src/routes/register.route.js";
import cors from "cors";
import swaggerRouter from "./src/routes/swagger.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

connectDatabase();
app.use(
    cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/registers", registerRouter);
app.use("/doc", swaggerRouter)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));






// código do server.js:

//import "dotenv/config";
//import app from "./app.js";
//
//const port = process.env.PORT || 3001;
//app.listen(port, () => console.log(`Server running on port: ${port}`));
