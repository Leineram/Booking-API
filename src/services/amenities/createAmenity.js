import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../error/BadRequest.js";

const createAmenity = async (name) => {
    const prisma = new PrismaClient();

    if (!name)
        throw new BadRequestError("Name is required");

    const amenityToCreate = await prisma.amenity.create({
        data: {
            name
        }
    });

    return amenityToCreate;
};

export default createAmenity;