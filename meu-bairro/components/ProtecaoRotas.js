"use client";

/*
  Leonardo de Castro Tonon - RA 10426930
  Leonardo Patriani Cardoso - RA 10417188
  Antonio Renilson Bezerra da Silva - RA 10722184
  Bernardo Souza Oliveira - RA 10312871
*/

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function ProtecaoRotas({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [rotaVerificada, setRotaVerificada] = useState(null);

  useEffect(() => {
    if (pathname === "/login") {
      setRotaVerificada("/login");
      return;
    }

    const usuarioLogado =
      localStorage.getItem("usuarioLogado") === "true";

    if (!usuarioLogado) {
      setRotaVerificada(null);
      router.replace("/login");
      return;
    }

    setRotaVerificada(pathname);
  }, [pathname, router]);

  if (pathname !== "/login" && rotaVerificada !== pathname) {
    return null;
  }

  return children;
}