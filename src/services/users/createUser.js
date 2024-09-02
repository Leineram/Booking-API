import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../error/BadRequest.js";


const createUser = async (username, password, name, email, phoneNumber, profilePicture) => {
    const prisma = new PrismaClient();

    if (!username || !password || !name || !email || !phoneNumber || !profilePicture)
        throw new BadRequestError("All fields are required");

    if (await prisma.user.findUnique({ where: { username } }))
        throw new BadRequestError("User already exists");

    const userToCreate = await prisma.user.create({
        data: {
            password,
            name,
            email,
            phoneNumber,
            profilePicture,
            username
        }
    })

    return userToCreate;
}

export default createUser;