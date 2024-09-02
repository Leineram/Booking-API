import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/NotFound.js";

const deletePropertyById = async (id) => {
    const prisma = new PrismaClient();
    const propertyToDelete = await prisma.property.deleteMany({
        where: {
            id
        }
    });

    if (!propertyToDelete || propertyToDelete.count === 0)
        throw new NotFoundError("Property", id);

    return id;
};

export default deletePropertyById;