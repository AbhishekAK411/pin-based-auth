import express, { Router } from "express";
import { checkPin, checkRegister } from "../middlewares/authMiddleware.js";
import { register, updateAddress, updateEmail, updateNumber, updatePancard, updatePassword, updateUsername } from "../controllers/userControllers.js";

const router = express.Router();

//routes
router.post("/register", checkRegister, register);

//update links
router.post("/updateEmail", checkPin, updateEmail);  // update email address
router.post("/updateNumber", checkPin, updateNumber);  // update number
router.post("/updateUsername", checkPin ,updateUsername);  // update username
router.post("/updatePassword", checkPin, updatePassword);  // update password
router.post("/updateAddress", checkPin, updateAddress);  // update address
router.post("/updatePancard", checkPin, updatePancard);  // update pancard

export default router;