const { faker } = require('@faker-js/faker');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

  for (let i = 0; i < 10; i++) {
    const newMockPatient = {
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      gender: 'Male',
      pEmail: faker.internet.exampleEmail(),
      dni: faker.number.int({ min: 1000000, max: 40000000 }), // Assuming DNI is a 8-digit number
      phone: '424212',
      age: 9,
      apartment: 'nose',
      addressNumber: 400,
      birthDate: '/20/3/1994',
      establishment: 'e',
      floor: '3',
      locality: 'argentina',
      nationality: 'argentina',
      socialWork: 'nose',
      street: 'Colon',
    };
    await prisma.patient.create({ data: newMockPatient });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
