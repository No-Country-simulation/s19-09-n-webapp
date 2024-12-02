import { PrismaClient } from '@prisma/client';
import { image1 } from './images.seed';
const prisma = new PrismaClient();

export async function seedProperties() {
  try {
    const user1 = await prisma.user.findFirst({
      where: { AND: [{ name: 'Alice' }, { last_name: 'Cooper' }] },
    });
    const property1_user_1 = await prisma.property.create({
      data: {
        title: 'Cuarto para estudiante',
        address: 'C14 x 15 y 22',
        city: 'BUENOS_AIRES',
        property_type: 'ROOM',
        max_occupants: 2,
        payment_by_period: 3000,
        min_rental_period: 'MONTHLY',
        is_furnished: true,
        is_services_included: true,
        rating: 0,
        user_id: user1.id,
      },
    });

    //SERVICES
    const airConditioner = await prisma.service.findFirst({
      where: { type: 'AIR_CONDITIONER' },
    });
    await prisma.servicesOnProperty.create({
      data: {
        property_id: property1_user_1.id,
        service_id: airConditioner.id,
      },
    });

    const internet = await prisma.service.findFirst({
      where: { type: 'INTERNET' },
    });
    await prisma.servicesOnProperty.create({
      data: {
        property_id: property1_user_1.id,
        service_id: internet.id,
      },
    });

    //ROOMS
    const bathRoom = await prisma.room.findFirst({
      where: { AND: [{ type: 'BATHROOM' }, { quantity: 1 }] },
    });
    await prisma.roomsOnProperty.create({
      data: {
        property_id: property1_user_1.id,
        room_id: bathRoom.id,
      },
    });

    const bedRoom = await prisma.room.findFirst({
      where: { AND: [{ type: 'BEDROOM' }, { quantity: 1 }] },
    });
    await prisma.roomsOnProperty.create({
      data: {
        property_id: property1_user_1.id,
        room_id: bedRoom.id,
      },
    });

    //UNIVERSITY
    const university = await prisma.university.findFirst({
      where: { name: 'Universidad de Buenos Aires' },
    });
    await prisma.nearLocation.create({
      data: {
        distance: 500,
        property_id: property1_user_1.id,
        university_id: university.id,
      },
    });

    await prisma.propertyPhoto.create({
      data: {
        photo_base_64: image1,
        property_id: property1_user_1.id,
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
