import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../error/NotFound.js";

const deleteReviewById = async (id) => {
    const prisma = new PrismaClient();

    const viewToDelete = await prisma.review.deleteMany({
        where: {
            id
        }
    });

    if (!viewToDelete || viewToDelete.count === 0)
        throw new NotFoundError("Review", id);

    return id;
};

export default deleteReviewById;



