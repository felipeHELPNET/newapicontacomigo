import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { create, findAll, topValors, findById } from "../controllers/valors.controller.js";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topValors);
router.get("/:id", findById);

export default router;
