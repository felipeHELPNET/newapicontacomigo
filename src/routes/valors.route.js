import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { create, findAll, topValors, findById, searchByTitle, byUser, update} from "../controllers/valors.controller.js";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topValors);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, byUser);
router.get("/:id", authMiddleware, findById);
router.patch("/:id", authMiddleware, update);

export default router;
