import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  create,
  findAll,
  topRegisters,
  findById,
  searchByTitle,
  byUser,
  update,
  erase,
  likeRegister,
  commentRegister,
  deleteComment,
} from "../controllers/registers.controller.js";

const router = Router();

router.post("/", authMiddleware, create);
router.get("/", findAll);
router.get("/top", topRegisters);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, byUser);
router.get("/:id", authMiddleware, findById);
router.patch("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, erase);
router.patch("/like/:id", authMiddleware, likeRegister);
router.patch("/comment/:id", authMiddleware, commentRegister);
router.patch("/comment/:idRegister/:idComment", authMiddleware, deleteComment);


export default router;
