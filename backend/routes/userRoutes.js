import express from "express";
import { createAccount } from "../controllers/userController.js";
import { loginUser } from "../controllers/loginController.js";
import addNote from "../controllers/addNoteController.js";
import authenticationToken from "../middlewares/authenticationToken.js";
import editNote from "../controllers/editNoteController.js";

const router = express.Router();

router.post('/create-account', createAccount);
router.post('/login', loginUser);
router.post('/add-note', authenticationToken, addNote);
router.put('/edit-note/:noteId', authenticationToken, editNote);

export default router;