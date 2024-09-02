import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../error/BadRequest.js";

const login = async (username, password) => {
    const prisma = new PrismaClient();

    const key = process.env.AUTH_SECRET_KEY

    if (!username || !password)
        throw new BadRequestError("All fields are required");
    const user = await prisma.user.findFirst({
        where: {
            username,
            password
        }
    })

    if (!user)
        return null;

    const token = jwt.sign({ id: user.id }, key);

    return token;

};

export default login;