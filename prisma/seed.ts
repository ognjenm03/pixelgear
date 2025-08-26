import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Brendovi
  const brands = [
    { name: 'Logitech', slug: 'logitech' },
    { name: 'Razer', slug: 'razer' },
    { name: 'Corsair', slug: 'corsair' },
    { name: 'MSI', slug: 'msi' },
    { name: 'ASUS', slug: 'asus' },
    { name: 'HP', slug: 'hp' },
  ];

  for (const b of brands) {
    await prisma.brand.upsert({
      where: { slug: b.slug },
      update: {},
      create: { name: b.name, slug: b.slug },
    });
  }

  // Kategorije
  const categories = [
    { name: 'Mice', slug: 'mice' },
    { name: 'Keyboards', slug: 'keyboards' },
    { name: 'Graphics Cards', slug: 'graphics-cards' },
    { name: 'Monitors', slug: 'monitors' },
    { name: 'Laptops', slug: 'laptops' },
    { name: 'Accessories', slug: 'accessories' },
  ];

  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: { name: c.name, slug: c.slug },
    });
  }

  // Proizvodi
  const products = [
    {
      name: 'Logitech G502 Mouse',
      slug: 'logitech-g502-mouse',
      price: 79,
      stock: 15,
      brandSlug: 'logitech',
      categorySlug: 'mice',
      imageUrl: 'https://res.cloudinary.com/dq4sjvogw/image/upload/v1756225568/logitech-g502_lkwiqr.jpg',
    },
    {
      name: 'Razer BlackWidow Keyboard',
      slug: 'razer-blackwidow-keyboard',
      price: 120,
      stock: 10,
      brandSlug: 'razer',
      categorySlug: 'keyboards',
      imageUrl: 'https://res.cloudinary.com/dq4sjvogw/image/upload/v1756225586/razer-blackwidow_ffazxv.jpg',
    },
    {
      name: 'MSI RTX 3080 Graphics Card',
      slug: 'msi-rtx-3080',
      price: 699,
      stock: 5,
      brandSlug: 'msi',
      categorySlug: 'graphics-cards',
      imageUrl: 'https://res.cloudinary.com/dq4sjvogw/image/upload/v1756225577/msi-rtx3080_r8ksi2.jpg',
    },
    {
      name: 'ASUS 27" Monitor',
      slug: 'asus-27-monitor',
      price: 250,
      stock: 8,
      brandSlug: 'asus',
      categorySlug: 'monitors',
      imageUrl: 'https://res.cloudinary.com/dq4sjvogw/image/upload/v1756225526/asus-monitor_frdm1i.jpg',
    },
    {
      name: 'HP Pavilion Laptop',
      slug: 'hp-pavilion-laptop',
      price: 799,
      stock: 7,
      brandSlug: 'hp',
      categorySlug: 'laptops',
      imageUrl: 'https://res.cloudinary.com/dq4sjvogw/image/upload/v1756225560/hp-pavilion_iicuyh.jpg',
    },
  ];

  for (const p of products) {
    const brand = await prisma.brand.findUnique({ where: { slug: p.brandSlug } });
    if (!brand) throw new Error(`Brand not found: ${p.brandSlug}`);

    const category = await prisma.category.findUnique({ where: { slug: p.categorySlug } });
    if (!category) throw new Error(`Category not found: ${p.categorySlug}`);

    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        price: p.price,
        stock: p.stock,
        brandId: brand.id,
        categoryId: category.id,
        imageUrl: p.imageUrl,
      },
    });
  }

  // Admin korisnik
  await prisma.user.upsert({
    where: { email: 'admin@pixelgear.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@pixelgear.com',
      role: 'ADMIN',
    },
  });

  console.log('✅ Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
