import express from "express";
import cors from "cors";
import connectDatabase from "./database/db.js";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import registersRoute from "./routes/registers.route.js";
import swaggerRoute from "./routes/swagger.route.js";

dotenv.config();

const app = express();

app.use(cors({
    origin:"http://localhost:5173", 
    methods:["GET", "POST", "PUT", "DELETE"],
}))

const port = process.env.PORT || 8080;

connectDatabase();
app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/registers", registersRoute);
app.use("/doc", swaggerRoute);

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
