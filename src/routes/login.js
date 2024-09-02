import { Router } from "express";
import login from "../services/auth/login.js";
import errorHandler from "../middleware/errorHandler.js";
import IvalidCredentials from "../error/InvalidCredentials.js";

const router = Router();

router.post("/", async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const token = await login(username, password);

        if (!token) {
            throw new IvalidCredentials("Invalid credentials");
        } else {
            res.status(200).json({ message: "Successfully logged in!", token });
        }
    } catch (err) {
        next(err);
    }
}, errorHandler);

export default router;