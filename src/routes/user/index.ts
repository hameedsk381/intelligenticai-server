import { Router } from "express";
import userController from "../../controller/user";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.loginUser);
router.get("/agents/:userid", userController.getAllAgentsByUserId);
router.post("/changepassword", userController.changePassword);

export default router;
