import { Router } from "express";
import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";
import createProperty from "../services/properties/createProperty.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import errorHandler from "../middleware/errorHandler.js";
import authmiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const { location, pricePerNight } = req.query;
        const properties = await getProperties(location, pricePerNight);
        res.status(200).json(properties);
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const property = await getPropertyById(id);
        res.status(200).json(property);
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.put("/:id", authmiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, hostId, location, pricePerNight, rating, bedroomCount, bathRoomCount, maxGuestCount } = req.body;
        const propertyToUpdate = await updatePropertyById(id, title, description, hostId, location, pricePerNight, rating, bedroomCount, bathRoomCount, maxGuestCount);
        res.status(200).json(propertyToUpdate);
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.delete("/:id", authmiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const propertyToDelete = await deletePropertyById(id);
        res.status(200).json({ message: `Property with ${propertyToDelete} id was deleted` });
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.post("/", authmiddleware, async (req, res, next) => {
    try {
        const { title, description, hostId, location, pricePerNight, rating, bedroomCount, bathRoomCount, maxGuestCount } = req.body;
        const newProperty = await createProperty(title, description, hostId, location, pricePerNight, rating, bedroomCount, bathRoomCount, maxGuestCount);
        res.status(201).json(newProperty);
    } catch (err) {
        next(err);
    }
}, errorHandler);

export default router;
