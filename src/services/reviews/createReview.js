import { PrismaClient } from "@prisma/client";
import BadRequestError from "../../error/BadRequest.js";

const createReview = async (rating, comment, propertyId, userId) => {
    const prisma = new PrismaClient();

    if (!rating || !comment || !propertyId || !userId)
        throw new BadRequestError("All fields are required");

    const reviewToCreate = await prisma.review.create({
        data: {
            rating,
            comment,
            propertyId,
            userId
        }
    });

    return reviewToCreate;
}

export default createReview;