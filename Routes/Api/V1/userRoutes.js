import express from "express";
import {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserController,
} from "../../../Controller/userController.js";

const router = express.Router();

router.post("/createUser", createUserController);
router.get("/getAllUsers", getAllUsersController);
router.get("/getUser/:id", getUserByIdController);
router.put("/updateUser/:id", updateUserByIdController);
router.delete("/deleteUser/:id", deleteUserController);

export default router;
