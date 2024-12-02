import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedServices() {
  try {
    await prisma.service.createMany({
      data: [
        { type: 'AIR_CONDITIONER' },
        { type: 'CLEANING' },
        { type: 'WASHING_MACHINE' },
        { type: 'INTERNET' },
        { type: 'WATER' },
        { type: 'HEATER' },
      ],
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
