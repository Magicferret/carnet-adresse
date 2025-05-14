import { PrismaClient } from '../src/generated/prisma/client'


const prisma = new PrismaClient()
const contacts = [
  {
    email: 'alice@prisma.io',
    firstName: 'Alice',
    lastName: 'Bateau',
    phone: '0666778899',
    avatarSlug: 'cat',
  },
  {
    email: 'bob@prisma.io',
    firstName: 'Bob',
    lastName: 'Voiture',
    phone: '0711223344',
    avatarSlug: 'ox',
  },
]

async function main() {
  for (const contact of contacts) {
    const existing = await prisma.contact.findFirst({
      where: { email: contact.email }
    })

    if (!existing) {
      const created = await prisma.contact.create({ data: contact })
      console.log(`Created contact: ${created.firstName} ${created.lastName}`)
    } else {
      console.log(`Contact ${contact.firstName} ${contact.lastName} already exists`)
    }
  }
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
