import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../error/BadRequest.js";

const createProperty = async (title, description, hostId, location, pricePerNight, rating, bedroomCount, bathRoomCount, maxGuestCount) => {
    const prisma = new PrismaClient();

    if (!title || !description || !hostId || !location || !pricePerNight || !rating || !bedroomCount || !bathRoomCount || !maxGuestCount) {
        throw new BadRequestError("All fields are required");
    }

    const propertyToCreate = await prisma.property.create({
        data: {
            title,
            description,
            location,
            pricePerNight,
            rating,
            bedroomCount,
            bathRoomCount,
            maxGuestCount,
            host: {
                connect: {
                    id: hostId
                }
            }
        }
    });

    return propertyToCreate;
};

export default createProperty;