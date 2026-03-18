import { loadEnvConfig } from '@next/env';
loadEnvConfig(process.cwd());

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log(`Znaleziono użytkowników: ${users.length}`);
  
  if (users.length === 0) {
    console.log("Brak użytkowników w bazie. Upewnij się, że najpierw zalogowałeś się w sklepie używając guzika logowania!");
    return;
  }
  
  for (const user of users) {
    await prisma.user.update({
      where: { id: user.id },
      data: { role: 'ADMIN' }
    });
    console.log(`✅ Sukces: Nadano uprawnienia ADMIN dla użytkownika: ${user.email} (${user.name || 'Brak imienia'})`);
  }
}

main()
  .catch(e => console.error("Error:", e))
  .finally(async () => {
    await prisma.$disconnect();
  });
