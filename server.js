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

const allowedOrigins = [
  'https://newfrontcc.vercel.app',
  'https://newfrontcc-gnet9d7cv-felipehelpnet.vercel.app'
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/registers", registerRouter);
app.use("/doc", swaggerRouter)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));