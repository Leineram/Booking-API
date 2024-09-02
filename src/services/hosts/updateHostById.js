import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/NotFound.js";

const updateHostById = async (id, name, email, phoneNumber, profilePicture, aboutMe, username, password) => {
    const prisma = new PrismaClient();

    const host = await prisma.host.updateMany({
        where: {
            id
        },
        data: {
            name,
            email,
            phoneNumber,
            profilePicture,
            aboutMe,
            username,
            password
        }
    })

    if (!host || host.count == 0)
        throw new NotFoundError("Host", id);

    return { message: `Host with ${id} id was updated` };
}

export default updateHostById;