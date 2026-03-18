import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    if (users.length === 0) {
      return NextResponse.json({ 
        message: "⚠️ Brak użytkowników w bazie. Zaloguj się najpierw jako zwykły klient w sklepie, aby utworzyć konto." 
      });
    }
    
    const results = [];
    for (const user of users) {
      const updated = await prisma.user.update({
        where: { id: user.id },
        data: { role: "ADMIN" }
      });
      results.push(`✅ Sukces: Nadano uprawnienia ADMIN dla użytkownika: ${updated.email}`);
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "Uprawnienia zostały zmienione! Możesz teraz bezpiecznie usunąć plik app/api/set-admin/route.ts",
      results 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
