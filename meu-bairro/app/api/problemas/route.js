import { NextResponse } from "next/server";
import { alterarProblemas, categoriaPadrao, lerProblemas } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const problemas = await lerProblemas();
  return NextResponse.json(problemas);
}

export async function POST(request) {
  let corpo;
  try {
    corpo = await request.json();
  } catch {
    return NextResponse.json({ erro: "JSON inválido." }, { status: 400 });
  }

  const titulo = String(corpo.titulo || corpo.categoria || "").trim();
  const endereco = String(corpo.endereco || "").trim();
  const descricao = String(corpo.descricao || "").trim();

  if (!titulo || !endereco || !descricao) {
    return NextResponse.json(
      { erro: "Informe categoria, endereço e descrição." },
      { status: 400 }
    );
  }

  const agora = new Date();
  const dois = (n) => String(n).padStart(2, "0");

  const novo = await alterarProblemas((lista) => {
    const maiorId = lista.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0);
    const problema = {
      id: Math.max(Date.now(), maiorId + 1),
      titulo,
      categoria: categoriaPadrao(titulo),
      endereco,
      data: `${dois(agora.getDate())}/${dois(agora.getMonth() + 1)}/${agora.getFullYear()}`,
      horario: `${dois(agora.getHours())}:${dois(agora.getMinutes())}`,
      morador: String(corpo.morador || "João da Silva").trim(),
      descricao,
      foto: corpo.foto || null,
      status: "Aberto",
      novoInicial: true,
    };
    return { lista: [...lista, problema], retorno: problema };
  });

  return NextResponse.json(novo, { status: 201 });
}
