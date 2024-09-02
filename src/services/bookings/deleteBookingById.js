import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/NotFound.js";

const deleteBookingById = async (id) => {
    const prisma = new PrismaClient();

    const bookingToDelete = await prisma.booking.deleteMany({
        where: {
            id
        }
    });

    if (!bookingToDelete || bookingToDelete.count === 0)
        throw new NotFoundError("Booking ", id);

    return id;
};

export default deleteBookingById;