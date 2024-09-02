import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/NotFound.js";

const deleteAmenityById = async (id) => {
    const prisma = new PrismaClient();

    const amenityTodelete = await prisma.amenity.deleteMany({
        where: {
            id
        }
    });

    if (!amenityTodelete || amenityTodelete.count == 0)
        throw new NotFoundError("Amenity", id);

    return id;
};

export default deleteAmenityById;