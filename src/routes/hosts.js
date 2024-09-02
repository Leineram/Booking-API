import { Router } from "express";
import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import updateHostById from "../services/hosts/updateHostById.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import createHost from "../services/hosts/createHost.js";
import errorHandler from "../middleware/errorHandler.js";
import authmiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const { name } = req.query;
        const hosts = await getHosts(name);
        res.status(200).json(hosts);
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const host = await getHostById(id);
        res.status(200).json(host);
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.put("/:id", authmiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, phoneNumber, profilePicture, aboutMe, username, password } = req.body;
        const hostToUpdate = await updateHostById(id, name, email, phoneNumber, profilePicture, aboutMe, username, password);
        res.status(200).json(hostToUpdate);
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.delete("/:id", authmiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const hostToDelete = await deleteHostById(id);
        res.status(200).json({ message: `Host with ${hostToDelete} id was deleted` });
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.post("/", authmiddleware, async (req, res, next) => {
    try {
        const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body;
        const newHost = await createHost(username, password, name, email, phoneNumber, profilePicture, aboutMe);
        res.status(201).json(newHost);
    } catch (err) {
        next(err);
    }
}, errorHandler);

export default router;
