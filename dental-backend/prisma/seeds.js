const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

  const roles = await prisma.roles.findFirst();

  if (!roles) {
    await prisma.roles.createMany({
      data: [
        {
          name: 'ASSOCIATED',
        },
        {
          name: 'CLIENT',
        },
        {
          name: 'OWNER',
        },
        {
          name: 'SECRETARY',
        },
      ],
    });
  }

  const user = await prisma.user.create({
    data: {
      firstName: 'Admin',
      lastName: 'Admin',
      dni: 111111,
      email: 'admin@gmail.com',
      password: await hash('1234', 10),
      role_name: 'OWNER',
    },
  });

  await prisma.dentist.create({
    data: {
      notes: '',
      userId: user.id,
      fullname: `${user.lastName}, ${user.firstName}`,
    },
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
