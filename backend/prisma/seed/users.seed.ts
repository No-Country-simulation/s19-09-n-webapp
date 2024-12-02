import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedUsers() {
  try {
    await prisma.user.upsert({
      where: { email: 'alice@gmail.com' },
      update: {},
      create: {
        email: 'alice@prisma.io',
        name: 'Alice',
        last_name: 'Cooper',
        email_verified: true,
        password: 'SecurePassword123!',
        is_owner: false,
        deleted: false,
        role: 'USER',
        remember_token: '',
      },
    });

    await prisma.user.upsert({
      where: { email: 'bob@example.com' },
      update: {},
      create: {
        email: 'bob@example.com',
        name: 'Bob',
        last_name: 'Johnson',
        email_verified: true,
        password: 'SecurePassword123!',
        is_owner: false,
        deleted: false,
        role: 'USER',
        remember_token: '',
      },
    });

    await prisma.user.upsert({
      where: { email: 'eve.williams@hospital.net' },
      update: {},
      create: {
        email: 'eve.williams@hospital.net',
        name: 'Eve',
        last_name: 'Williams',
        email_verified: true,
        password: 'SecurePassword123!',
        is_owner: false,
        deleted: false,
        role: 'USER',
        remember_token: '',
      },
    });

    await prisma.user.upsert({
      where: { email: 'm.garcia@correo.net' },
      update: {},
      create: {
        email: 'm.garcia@correo.net',
        name: 'Maria',
        last_name: 'Garcia',
        email_verified: true,
        password: 'SecurePassword123!',
        is_owner: true,
        deleted: false,
        role: 'USER',
        remember_token: '',
      },
    });
    await prisma.user.upsert({
      where: { email: 'luis.romero@correo.com' },
      update: {},
      create: {
        email: 'luis.romero@correo.com',
        name: 'Luis',
        last_name: 'Garcia',
        email_verified: true,
        password: 'SecurePassword123!',
        is_owner: true,
        deleted: false,
        role: 'USER',
        remember_token: '',
      },
    });
    await prisma.user.upsert({
      where: { email: 'j.perez@gmail.com' },
      update: {},
      create: {
        email: 'j.perez@gmail.com',
        name: 'Juan',
        last_name: 'Perez',
        email_verified: true,
        password: 'SecurePassword123!',
        is_owner: true,
        deleted: false,
        role: 'USER',
        remember_token: '',
      },
    });

    await prisma.user.upsert({
      where: { email: 'moderator@gmail.com' },
      update: {},
      create: {
        email: 'moderator@gmail.com',
        name: 'MODERATOR',
        last_name: 'MODERATOR',
        email_verified: true,
        password: 'Moderator1234',
        is_owner: false,
        deleted: false,
        role: 'MODERATOR',
        remember_token: '',
      },
    });

    await prisma.user.upsert({
      where: { email: 'admin@gmail.com' },
      update: {},
      create: {
        email: 'admin@gmail.com',
        name: 'ADMIN',
        last_name: 'ADMIN',
        email_verified: true,
        password: 'Admin1234',
        is_owner: false,
        deleted: false,
        role: 'ADMIN',
        remember_token: '',
      },
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
