import { Router } from "express";
const router = Router();

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { create, findAll } from "../controllers/valors.controller.js";

router.post("/", authMiddleware, create);
router.get("/", findAll);

export default router;
