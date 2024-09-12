import { PrismaClient } from "@prisma/client";

const getProperties = async (location, pricePerNight) => {
    const prisma = new PrismaClient();
    if (pricePerNight)
        pricePerNight = parseFloat(pricePerNight);

    return prisma.property.findMany({
        where: {
            location,
            pricePerNight
        }
    });
};

export default getProperties;