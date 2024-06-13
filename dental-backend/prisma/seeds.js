const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();

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

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
