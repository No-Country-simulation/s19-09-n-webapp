import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedUniversities() {
  try {
    await prisma.university.createMany({
      data: [
        {
          name: 'Universidad de Buenos Aires',
          image_url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Facultad_de_Ingenier%C3%ADa_de_la_Universidad_de_Buenos_Aires_%2827547142228%29.jpg/289px-Facultad_de_Ingenier%C3%ADa_de_la_Universidad_de_Buenos_Aires_%2827547142228%29.jpg',
          city: 'Buenos Aires',
          longitude: -58.3742,
          latitude: -34.5997,
        },
        {
          name: 'Universidad Católica Argentina',
          image_url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Universidad_Cat%C3%B3lica_Argentina_en_Puerto_Madero.jpg/320px-Universidad_Cat%C3%B3lica_Argentina_en_Puerto_Madero.jpg',
          city: 'Buenos Aires',
          longitude: -58.4072,
          latitude: -34.5961,
        },
        {
          name: 'Universidad Nacional de Córdoba',
          image_url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Patiocolonialcordoba.jpg/360px-Patiocolonialcordoba.jpg',
          city: 'Córdoba',
          longitude: -64.1808,
          latitude: -31.4164,
        },
        {
          name: 'Universidad Católica de Córdoba',
          image_url:
            'https://cedalc.org/wp-content/uploads/2021/11/ae6c0fee3895e6e76acb32b328e067a1.jpg',
          city: 'Córdoba',
          longitude: -64.1792,
          latitude: -31.4175,
        },
        {
          name: 'Universidad Nacional de Cuyo',
          image_url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Edificio_del_Rectorado_UNCuyo.jpg/320px-Edificio_del_Rectorado_UNCuyo.jpg',
          city: 'Mendoza',
          longitude: -68.8237,
          latitude: -32.8902,
        },
        {
          name: 'Universidad Tecnológica Nacional - Facultad Regional Mendoza',
          image_url:
            'https://geolupa.blob.core.windows.net/decultura/Images/Companies/Company_19985/Full/fce4ed7b-5493-474d-beca-f8b9653e2de4.jpg',
          city: 'Mendoza',
          longitude: -68.8319,
          latitude: -32.8902,
        },
        {
          name: 'Universidad Nacional de Salta',
          image_url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/UNSa_Predio_-_vista_a%C3%A9rea_2023.jpg/320px-UNSa_Predio_-_vista_a%C3%A9rea_2023.jpg',
          city: 'Salta',
          longitude: -65.4167,
          latitude: -24.7833,
        },
        {
          name: 'Universidad Católica de Salta',
          image_url:
            'https://lh3.googleusercontent.com/p/AF1QipOM6ABp8n0oZZBzjDXKOJgiF2PYzjm5tT3OnRw=s1360-w720-h640',
          city: 'Salta',
          longitude: -65.4333,
          latitude: -24.7667,
        },
        {
          name: 'Universidad Nacional de Tucumán',
          image_url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Universidad_Nacional_de_Tucum%C3%A1n.JPG/178px-Universidad_Nacional_de_Tucum%C3%A1n.JPG',
          city: 'Tucumán',
          longitude: -65.2225,
          latitude: -26.8225,
        },
        {
          name: 'Universidad Tecnológica Nacional - Facultad Regional Tucumán',
          image_url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Fachada_de_la_UTN_-_Facultad_Regional_Tucum%C3%A1n.jpg/320px-Fachada_de_la_UTN_-_Facultad_Regional_Tucum%C3%A1n.jpg',
          city: 'Tucumán',
          longitude: -65.2225,
          latitude: -26.8225,
        },
        {
          name: 'Universidad Nacional de Jujuy',
          image_url:
            'https://media.todojujuy.com/p/ca52ba3a16ad56661baf90f34367a9d0/adjuntos/227/imagenes/003/318/0003318845/790x0/smart/se-definieron-los-finalistas-la-creacion-la-bandera-la-unju.jpg',
          city: 'Jujuy',
          longitude: -65.4167,
          latitude: -24.7833,
        },
        {
          name: 'Universidad Católica de Santiago del Estero - Sede Jujuy',
          image_url:
            'https://lh3.googleusercontent.com/p/AF1QipPzLbElu-BkzjGJaGbk7JArYSPEYWUyKMDd-eWZ=s1360-w480-h360',
          city: 'Jujuy',
          longitude: -65.4333,
          latitude: -24.7667,
        },
        {
          name: 'Universidad Nacional del Chaco Austral',
          image_url:
            'https://lh3.googleusercontent.com/p/AF1QipOSVzhoLL2kjhL7eYn3l5G6x8tT7F1i6KngYU_t=s1360-w480-h360',
          city: 'Chaco',
          longitude: -60.3167,
          latitude: -27.1833,
        },
        {
          name: 'Universidad Tecnológica Nacional - Facultad Regional Resistencia',
          image_url:
            'https://lh3.googleusercontent.com/p/AF1QipPs5WORc4lUuTqifD3JCGtepgETkUJZdv4M7hfF=s1360-w1360-h1020',
          city: 'Chaco',
          longitude: -58.9833,
          latitude: -27.4833,
        },
        {
          name: 'Universidad Nacional de Misiones',
          image_url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Unam.JPG/316px-Unam.JPG',
          city: 'Misiones',
          longitude: -55.8956,
          latitude: -27.3667,
        },
        {
          name: 'Universidad Nacional de La Rioja',
          image_url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/CUERDA.jpg/180px-CUERDA.jpg',
          city: 'La Rioja',
          longitude: -66.8833,
          latitude: -29.4167,
        },
        {
          name: 'Universidad Tecnológica Nacional - Facultad Regional La Rioja',
          image_url:
            'https://lh3.googleusercontent.com/p/AF1QipNRY6EnZLoAgunO-fo61e9dUCqmwp7rYVrd6rJy=s1360-w640-h360',
          city: 'La Rioja',
          longitude: -66.9,
          latitude: -29.4333,
        },
        {
          name: 'Universidad Nacional de San Juan',
          image_url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/UNSJ_RECTORADO.JPG/320px-UNSJ_RECTORADO.JPG',
          city: 'San Juan',
          longitude: -68.5167,
          latitude: -31.5333,
        },
        {
          name: 'Universidad Católica de Cuyo San Juan',
          image_url:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/CATOLICA_DE_CUYO.jpg/800px-CATOLICA_DE_CUYO.jpg',
          city: 'San Juan',
          longitude: -68.5333,
          latitude: -31.5167,
        },
        {
          name: 'Universidad Nacional de San Luis',
          image_url:
            'https://lh3.googleusercontent.com/p/AF1QipPN2Aghejst08cmSCcq_X-pcQEg8M7GvGzFgCfi=s1360-w1360-h1020',
          city: 'San Luis',
          longitude: -65.5333,
          latitude: -33.3167,
        },
        {
          name: 'Universidad de la Punta',
          image_url:
            'https://lh3.googleusercontent.com/p/AF1QipPgsr9xcllzMgu1KmSN5lZWWvQtshmbXJLbj1az=s1360-w640-h1020',
          city: 'San Luis',
          longitude: -65.55,
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
