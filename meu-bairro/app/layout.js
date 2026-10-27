/*
  Leonardo de Castro Tonon - RA 10426930
  Leonardo Patriani Cardoso - RA 10417188
  Antonio Renilson Bezerra da Silva - RA 10722184
  Bernardo Souza Oliveira - RA 10312871
*/

import "./globals.css";
import Header from "@/components/Header";
import ProtecaoRotas from "@/components/ProtecaoRotas";

export const metadata = {
  title: "Meu Bairro",
  description: "Registre e acompanhe os problemas do seu bairro.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <ProtecaoRotas>
          <Header />
          {children}
        </ProtecaoRotas>
      </body>
    </html>
  );
}