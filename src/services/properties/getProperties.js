import { PrismaClient } from "@prisma/client";

const getProperties = async (location, pricePerNight) => {
    const prisma = new PrismaClient();
    // The query parameter for this endpoint referin the amenities was not implemented, because there is no connection between properties and amenities in the data. I ask to one of the mentors in Slack and he say it wasnt imortant. Otherwise let me know.
    return prisma.property.findMany({
        where: {
            location,
            pricePerNight
        }
    });
};

export default getProperties;