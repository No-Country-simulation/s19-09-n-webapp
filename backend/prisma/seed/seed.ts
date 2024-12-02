import { PrismaClient } from '@prisma/client';
import { seedUsers } from './users.seed';
import { seedServices } from './services.seed';
import { seedRooms } from './rooms.seed';
import { seedUniversities } from './universities.seed';
import { seedProperties } from './property.seed';
const prisma = new PrismaClient();

async function main() {
  try {
    const [users, services, rooms, universities] = await Promise.all([
      seedUsers(),
      seedServices(),
      seedRooms(),
      seedUniversities(),
    ]);

    if (users && services && rooms && universities) {
      await seedProperties();
    }
  } catch (error) {
    console.error(error);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
