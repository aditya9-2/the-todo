import express from "express";
import { createAccount } from "../controllers/userController.js";
import { loginUser } from "../controllers/loginController.js";

const router = express.Router();

router.post('/create-account', createAccount);
router.post('/login', loginUser);

export default router;