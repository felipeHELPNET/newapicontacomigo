import registerController from "../controllers/register.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { validId } from "../middlewares/global.middleware.js";

import { Router } from "express";

const registerRouter = Router();

registerRouter.get("/", registerController.findAllRegistersController);
registerRouter.get("/top", registerController.topNewsController);
registerRouter.get("/search", registerController.searchRegisterController);

registerRouter.use(authMiddleware);
registerRouter.post("/create", registerController.createRegisterController);

registerRouter.use(validId);
registerRouter.get("/byIdRegister/:id", registerController.findRegisterByIdController);
registerRouter.get("/byUserId", registerController.findRegistersByUserIdController);
registerRouter.patch("/update/:id", registerController.updateRegisterController);
registerRouter.delete("/delete/:id", registerController.deleteRegisterController);
registerRouter.patch("/:id/like", registerController.likeRegisterController);
registerRouter.patch("/:id/comment", registerController.commentRegisterController);
registerRouter.patch(
  "/:id/:idComment/comment",
  registerController.commentDeleteRegisterController
);

export default registerRouter;
