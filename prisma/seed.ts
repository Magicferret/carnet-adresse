import { PrismaClient } from '../src/generated/prisma/client'


const prisma = new PrismaClient()
async function main() {
  const alice = await prisma.contact.upsert({
    where: { email: 'alice.prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      firstName: 'Alice',
      lastName: 'Bateau',
      phone: '0666778899'
      },
  })
  const bob = await prisma.contact.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      firstName: 'Bob',
      lastName: 'Voiture',
      phone: '0711223344'
    },
  })
  console.log({ alice, bob })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
