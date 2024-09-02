import { Router } from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import getAmenitiesById from "../services/amenities/getAmenityById.js";
import deleteAmenityById from "../services/amenities/deleteAmenityById.js";
import createAmenity from "../services/amenities/createAmenity.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import errorHandler from "../middleware/errorHandler.js";
import authmiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const amenities = await getAmenities();
        res.status(200).json(amenities);
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const amenity = await getAmenitiesById(id);
        res.status(200).json(amenity);
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.put("/:id", authmiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const amenityToUpdate = await updateAmenityById(id, name);
        res.status(200).json(amenityToUpdate);
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.delete("/:id", authmiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const amenityToDelete = await deleteAmenityById(id);
        res.status(200).json({ message: `Amenity with ${amenityToDelete} id was deleted` });
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.post("/", authmiddleware, async (req, res, next) => {
    try {
        const { name } = req.body;
        const newAmenity = await createAmenity(name);
        res.status(201).json(newAmenity);
    } catch (err) {
        next(err);
    }
}, errorHandler);

export default router;