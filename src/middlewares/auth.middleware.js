import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const authMiddleware = (rep, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.send(401);
  }

  const parts = authorization.split(" ");

  if (parts.length !== 2) {
    return res.send(401);
  }

  const [schema, token] = parts;

  if (schema !== "Bearer") {
    return res.send(401);
  }

  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    console.log(error);
    console.log(decoded);
  });

  next();
};
