import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/NotFound.js";

const getPropertyById = async (id) => {
    const prisma = new PrismaClient();

    const property = await prisma.property.findUnique({
        where: {
            id
        },
        include: {
            reviews: true
        }
    });

    if (!property)
        throw new NotFoundError("Property", id);

    return property;
};

export default getPropertyById