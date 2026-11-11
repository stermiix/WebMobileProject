import { NextResponse } from "next/server";
import { alterarProblemas, lerProblemas } from "@/lib/db";

export const dynamic = "force-dynamic";

const naoEncontrado = () =>
  NextResponse.json({ erro: "Problema não encontrado." }, { status: 404 });

export async function GET(_request, { params }) {
  const { id } = await params;
  const lista = await lerProblemas();
  const problema = lista.find((p) => String(p.id) === String(id));
  return problema ? NextResponse.json(problema) : naoEncontrado();
}

export async function PATCH(request, { params }) {
  const { id } = await params;
  let corpo;
  try {
    corpo = await request.json();
  } catch {
    return NextResponse.json({ erro: "JSON inválido." }, { status: 400 });
  }

  const permitidos = ["status", "titulo", "endereco", "descricao", "foto"];
  if (corpo.status && !["Aberto", "Resolvido"].includes(corpo.status)) {
    return NextResponse.json({ erro: "Status inválido." }, { status: 400 });
  }

  const atualizado = await alterarProblemas((lista) => {
    const indice = lista.findIndex((p) => String(p.id) === String(id));
    if (indice === -1) return { lista: null, retorno: null };

    const novo = { ...lista[indice] };
    for (const campo of permitidos) {
      if (campo in corpo) novo[campo] = corpo[campo];
    }
    const nova = [...lista];
    nova[indice] = novo;
    return { lista: nova, retorno: novo };
  });

  return atualizado ? NextResponse.json(atualizado) : naoEncontrado();
}

export async function DELETE(_request, { params }) {
  const { id } = await params;

  const removido = await alterarProblemas((lista) => {
    const existe = lista.some((p) => String(p.id) === String(id));
    if (!existe) return { lista: null, retorno: false };
    return {
      lista: lista.filter((p) => String(p.id) !== String(id)),
      retorno: true,
    };
  });

  return removido
    ? NextResponse.json({ ok: true })
    : naoEncontrado();
}
