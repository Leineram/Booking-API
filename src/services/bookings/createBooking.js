import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../error/BadRequest.js";

const createBooking = async (checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus, propertyId, userId) => {
    const prisma = new PrismaClient();

    if (!checkinDate || !checkoutDate || !numberOfGuests || !totalPrice || !bookingStatus || !propertyId || !userId)
        throw new BadRequestError("All fields are required");

    const bookingToCreate = await prisma.booking.create({
        data: {
            checkinDate,
            checkoutDate,
            numberOfGuests,
            totalPrice,
            bookingStatus,
            propertyId,
            userId
        }
    });

    return bookingToCreate;
};

export default createBooking;