import { getUsers, enterUser, getUserById, updateUserById, deleteUserById, login } from "../controllers/userControllers.js";
import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";

const router = express.Router();
router.get("/", getUsers);
router.post("/",authenticate, enterUser);
router.get("/byid/:id",authenticate, getUserById);
router.put("/byid/:id", authenticate, authorize('admin'), updateUserById);
router.delete("/byid/:id", authenticate, authorize('admin'), deleteUserById);
router.post("/login", login);

export default router;