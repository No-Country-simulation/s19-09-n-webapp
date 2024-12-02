import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedUniversities() {
  try {
    await prisma.university.createMany({
      data: [
        {
          name: 'Universidad de Buenos Aires',
          longitud: -58.3742,
          latitude: -34.5997,
        },
        {
          name: 'Universidad Católica Argentina',
          longitud: -58.4072,
          latitude: -34.5961,
        },
        {
          name: 'Universidad Nacional de Córdoba',
          longitud: -64.1808,
          latitude: -31.4164,
        },
        {
          name: 'Universidad Católica de Córdoba',
          longitud: -64.1792,
          latitude: -31.4175,
        },
        {
          name: 'Universidad Nacional de Cuyo',
          longitud: -68.8237,
          latitude: -32.8902,
        },
        {
          name: 'Universidad Tecnológica Nacional - Facultad Regional Mendoza',
          longitud: -68.8319,
          latitude: -32.8902,
        },
        {
          name: 'Universidad Nacional de Salta',
          longitud: -65.4167,
          latitude: -24.7833,
        },
        {
          name: 'Universidad Católica de Salta',
          longitud: -65.4333,
          latitude: -24.7667,
        },
        {
          name: 'Universidad Nacional de Tucumán',
          longitud: -65.2225,
          latitude: -26.8225,
        },
        {
          name: 'Universidad Tecnológica Nacional - Facultad Regional Tucumán',
          longitud: -65.2225,
          latitude: -26.8225,
        },
        {
          name: 'Universidad Nacional de Jujuy',
          longitud: -65.4167,
          latitude: -24.7833,
        },
        {
          name: 'Universidad Católica de Santiago del Estero - Sede Jujuy',
          longitud: -65.4333,
          latitude: -24.7667,
        },
        {
          name: 'Universidad Nacional del Chaco Austral',
          longitud: -60.3167,
          latitude: -27.1833,
        },
        {
          name: 'Universidad Tecnológica Nacional - Facultad Regional Resistencia',
          longitud: -58.9833,
          latitude: -27.4833,
        },
        {
          name: 'Universidad Nacional de Misiones',
          longitud: -55.8956,
          latitude: -27.3667,
        },
        {
          name: 'Universidad Católica de Santa Fe - Sede Santos Mártires',
          longitud: -55.8917,
          latitude: -27.3667,
        },
        {
          name: 'Universidad Nacional de La Rioja',
          longitud: -66.8833,
          latitude: -29.4167,
        },
        {
          name: 'Universidad Tecnológica Nacional - Facultad Regional La Rioja',
          longitud: -66.9,
          latitude: -29.4333,
        },
        {
          name: 'Universidad Nacional de San Juan',
          longitud: -68.5167,
          latitude: -31.5333,
        },
        {
          name: 'Universidad Católica de Cuyo',
          longitud: -68.5333,
          latitude: -31.5167,
        },
        {
          name: 'Universidad Nacional de San Luis',
          longitud: -65.5333,
          latitude: -33.3167,
        },
        {
          name: 'Universidad de la Punta',
          longitud: -65.55,
          latitude: -33.3,
        },
      ],
    });

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
