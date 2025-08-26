import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  await prisma.brand.upsert({
    where: { slug: 'razer' },
    update: {},
    create: { name: 'Razer', slug: 'razer' },
  })
  console.log("Seed završen ✅")
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => { prisma.$disconnect() })