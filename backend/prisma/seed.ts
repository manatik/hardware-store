import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [{ name: 'user' }, { name: 'admin' }],
    skipDuplicates: true,
  });

  await prisma.category.createMany({
    data: [
      { name: 'фанера', article: '1000' },
      { name: 'дом', article: '2000' },
      { name: 'мебель', article: '3000' },
    ],
    skipDuplicates: true,
  });

  const role = await prisma.role.findFirst({ where: { name: 'admin' } });

  const email = 'plywood@admin.ru';

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    await prisma.user.create({
      data: {
        email,
        password: await bcrypt.hash('!Afythf543216', 10),
        roles: { connect: { id: role.id } },
      },
    });
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
