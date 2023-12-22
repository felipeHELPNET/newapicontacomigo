import { Router } from "express";
import userRouter from "./user.route.js";
import registerRouter from "./register.route.js";
import authRouter from "./auth.route.js";
import swaggerRouter from "./swagger.route.js";

const router = Router();

// Middleware global permitindo caching por 1 hora
router.use((req, res, next) => {
  // Remova explicitamente os cabeçalhos no-cache e Pragma
  res.removeHeader('Cache-Control');
  res.removeHeader('Pragma');
  
  // Adicione o cabeçalho Cache-Control desejado
  res.header('Cache-Control', 'public, max-age=3600');

  next();
});

router.use("/user", userRouter);
router.use("/registers", registerRouter);
router.use("/auth", authRouter);
router.use("/doc", swaggerRouter);

export default router;

/* import { Router } from "express";
import userRouter from "./user.route.js";
import registerRouter from "./register.route.js";
import authRouter from "./auth.route.js";
import swaggerRouter from "./swagger.route.js";

const router = Router();

router.use((req, res, next) => {
  res.header('Cache-Control', 'public, max-age=3600');
  next();
});

router.use("/user", userRouter);
router.use("/registers", registerRouter);
router.use("/auth", authRouter);
router.use("/doc", swaggerRouter);

export default router; */


