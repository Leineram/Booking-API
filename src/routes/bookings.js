import { Router } from "express";
import getBookings from "../services/bookings/getBookings.js";
import getBookingById from "../services/bookings/getBookingById.js";
import createBooking from "../services/bookings/createBooking.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import errorHandler from "../middleware/errorHandler.js";
import authmiddleware from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const { userId } = req.query;
        const bookings = await getBookings(userId);
        res.status(200).json(bookings);
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const booking = await getBookingById(id);
        res.status(200).json(booking);
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.put("/:id", authmiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus, propertyId, userId } = req.body;
        const bookingToUpdate = await updateBookingById(id, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus, propertyId, userId);
        res.status(200).json(bookingToUpdate);
    } catch (err) {
        next(err);
    }
}, errorHandler);

router.delete("/:id", authmiddleware, async (req, res, next) => {
    try {
        const { id } = req.params;
        const bookingToDelete = await deleteBookingById(id);
        res.status(200).json({ message: `Booking with ${bookingToDelete} id was deleted` })
    } catch (err) {
        next(err);
    }
}, errorHandler)

router.post("/", authmiddleware, async (req, res, next) => {
    try {
        const { checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus, propertyId, userId } = req.body;
        const newBooking = await createBooking(checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus, propertyId, userId);
        res.status(201).json(newBooking);
    } catch (err) {
        next(err);
    }
}, errorHandler);

export default router;
