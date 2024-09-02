import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../error/BadRequest.js";

const createHost = async (username, password, name, email, phoneNumber, profilePicture, aboutMe) => {
    const prisma = new PrismaClient();

    if (!username || !password || !name || !email || !phoneNumber || !profilePicture || !aboutMe)
        throw new BadRequestError("All fields are required");

    if (await prisma.host.findUnique({ where: { username } }))
        throw new BadRequestError("Host already exists");

    const hostToCreate = await prisma.host.create({
        data: {
            username,
            password,
            name,
            email,
            phoneNumber,
            profilePicture,
            aboutMe,
        }
    });

    return hostToCreate;
}

export default createHost;