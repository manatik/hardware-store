import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [{ name: 'user' }, { name: 'admin' }],
    skipDuplicates: true
  });

  await prisma.category.createMany({
    data: [{ name: 'фанера', article: '1000' }, { name: 'дом', article: '2000' }, { name: 'мебель', article: '3000' }],
    skipDuplicates: true
  })

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
