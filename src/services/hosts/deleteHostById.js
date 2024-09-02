import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/NotFound.js";

const deleteHostById = async (id) => {
    const prisma = new PrismaClient();

    const hostTodelete = await prisma.host.deleteMany({
        where: {
            id
        }
    })

    if (!hostTodelete || hostTodelete.count == 0)
        throw new NotFoundError("Host", id);

    return id
};

export default deleteHostById;