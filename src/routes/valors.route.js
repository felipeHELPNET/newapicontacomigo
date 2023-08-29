import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { create, findAll } from "../controllers/valors.controller.js";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", findAll);

export default router;
