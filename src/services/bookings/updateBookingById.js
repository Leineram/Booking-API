import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/NotFound.js";

const updateBookingById = async (id, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus, propertyId, userId) => {
    const prisma = new PrismaClient();

    const bookingToUpdate = await prisma.booking.updateMany({
        where: {
            id
        },
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

    if (!bookingToUpdate || bookingToUpdate.count === 0)
        throw new NotFoundError("Booking ", id);

    return { message: `Booking with ${id} id was updated` };
};

export default updateBookingById;