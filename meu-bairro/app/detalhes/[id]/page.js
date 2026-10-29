"use client";

import { useParams } from "next/navigation";
import DetalhesPage from "../page";

export default function DetalhesDinamicosPage() {
  const params = useParams();
  const id = params.id;

  return <DetalhesPage problemaIdInicial={id} />;
}