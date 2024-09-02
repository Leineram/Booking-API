import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/NotFound.js";

const deleteUserById = async (id) => {
    const prisma = new PrismaClient();

    const userTodelete = await prisma.user.deleteMany({
        where: {
            id
        }
    })

    if (!userTodelete || userTodelete.count == 0)
        throw new NotFoundError("User", id);

    return id
};

export default deleteUserById;