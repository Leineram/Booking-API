import { Router } from "express";
import getUsers from "../services/users/getUsers.js";
import getUserById from "../services/users/getUserById.js";
import updateUserById from "../services/users/updateUserById.js";
import createUser from "../services/users/createUser.js";
import deleteUserById from "../services/users/deleteUserById.js";
import errorHandler from "../middleware/errorHandler.js"; import authmiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const { username, email, name } = req.query;
        const users = await getUsers(username, email, name);
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.put("/:id", authmiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, password, name, email, phoneNumber, profilePicture } = req.body;
        const userToUpdate = await updateUserById(id, username, password, name, email, phoneNumber, profilePicture);
        res.status(200).json(userToUpdate);
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.delete("/:id", authmiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const userToDelete = await deleteUserById(id);
        res.status(200).json({ message: `User with ${userToDelete} id was deleted` });
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.post("/", authmiddleware, async (req, res, next) => {
    try {
        const { username, password, name, email, phoneNumber, profilePicture } = req.body;
        const newUser = await createUser(username, password, name, email, phoneNumber, profilePicture);
        res.status(201).json(newUser);
    } catch (err) {
        next(err);
    }
}, errorHandler);

export default router;
