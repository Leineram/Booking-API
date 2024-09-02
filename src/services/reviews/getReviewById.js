import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/NotFound.js";

const getreviewById = async (id) => {
    const prisma = new PrismaClient();

    const review = await prisma.review.findUnique({
        where: {
            id
        }
    });

    if (!review)
        throw new NotFoundError("Review", id);

    return review;
};

export default getreviewById;