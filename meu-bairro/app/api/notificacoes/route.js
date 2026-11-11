import { NextResponse } from "next/server";
import { lerProblemas } from "@/lib/db";

export const dynamic = "force-dynamic";

// Notificações = problemas registrados, com indicação de "novo inicial".
// O controle de "visualizado" por usuário continua no navegador.
export async function GET() {
  const problemas = await lerProblemas();
  return NextResponse.json(
    problemas.map((p) => ({ ...p, novoInicial: p.novoInicial !== false }))
  );
}
