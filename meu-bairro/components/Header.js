"use client";

/*
  Leonardo de Castro Tonon - RA 10426930
  Leonardo Patriani Cardoso - RA 10417188
  Antonio Renilson Bezerra da Silva - RA 10722184
  Bernardo Souza Oliveira - RA 10312871
*/

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  if (pathname === "/login") {
    return null;
  }

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <div className={styles.logoIcon}>🏠</div>
        Meu Bairro
      </Link>

      <nav className={styles.menu}>
        <Link href="/">🗺️ Mapa</Link>
        <Link href="/notificacoes">🔔 Notificações</Link>
        <Link href="/criar">➕ Registrar</Link>
        <Link href="/configuracoes">⚙️ Configurações</Link>
      </nav>
    </header>
  );
}