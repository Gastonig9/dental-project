const { PrismaClient } = require('@prisma/client');

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

  await prisma.user.create({
    data: {
      firstName: 'Admin',
      lastName: 'Admin',
      dni: 111111,
      email: 'admin@gmail.com',
      password: '1234',
      role_name: 'OWNER',
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
