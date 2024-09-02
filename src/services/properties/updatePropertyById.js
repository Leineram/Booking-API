import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/NotFound.js";

const updatePropertyById = async (id, title, description, hostId, location, pricePerNight, rating, bedroomCount, bathRoomCount, maxGuestCount) => {
    const prisma = new PrismaClient();

    const updateProperty = await prisma.property.updateMany({
        where: {
            id
        },
        data: {
            title,
            description,
            location,
            pricePerNight,
            rating,
            bedroomCount,
            bathRoomCount,
            maxGuestCount,
        }
    });

    if (!updateProperty || updateProperty.count == 0)
        throw new NotFoundError("Property", id);

    return { message: `Property with ${id} id was updated` };
};

export default updatePropertyById;