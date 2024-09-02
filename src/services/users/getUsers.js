import { PrismaClient } from "@prisma/client";

const getUsers = async (username, email, name) => {
    const prisma = new PrismaClient();

    return await prisma.user.findMany({
        where: {
            username,
            email,
            name
        }
    });
};

export default getUsers;