import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/NotFound.js";

const updateUserById = async (id, username, password, name, email, phoneNumber, profilePicture) => {
    const prisma = new PrismaClient();

    const user = await prisma.user.updateMany({
        where: {
            id
        },
        data: {
            username,
            password,
            name,
            email,
            phoneNumber,
            profilePicture
        }
    })

    if (!user || user.count == 0)
        throw new NotFoundError("User", id);

    return { message: `User with ${id} id was updated` };
}

export default updateUserById;