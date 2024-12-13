import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedRooms() {
  try {
    await prisma.room.createMany({
      data: [
        { type: 'BEDROOM', quantity: 1 },
        { type: 'BEDROOM', quantity: 2 },
        { type: 'BEDROOM', quantity: 3 },
        { type: 'BATHROOM', quantity: 1 },
        { type: 'BATHROOM', quantity: 2 },
        { type: 'BATHROOM', quantity: 3 },
        { type: 'DINNING', quantity: 1 },
        { type: 'GARAGE', quantity: 1 },
        { type: 'KITCHEN', quantity: 1 },
        { type: 'LAUNDRY', quantity: 1 },
        { type: 'LIVING', quantity: 1 },
        { type: 'STUDY', quantity: 1 },
      ],
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
