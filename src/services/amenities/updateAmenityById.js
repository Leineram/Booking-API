import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/NotFound.js";


const updateAmenityById = async (id, name) => {
    const prisma = new PrismaClient();

    const amenity = await prisma.amenity.updateMany({
        where: {
            id
        },
        data: {
            name
        }
    });

    if (!amenity || amenity.count == 0)
        throw new NotFoundError("Amenity", id);

    return { message: `Amenity with ${id} id was updated` };
};

export default updateAmenityById;