import type { Metadata } from "next";
import { Montserrat, Bebas_Neue } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vibe Coding y los Fundamentos · WindMar Home",
  description:
    "De las vibras del código a los fundamentos que sostienen todo. Una presentación de WindMar Home.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${montserrat.variable} ${bebas.variable}`}>
      <body>{children}</body>
    </html>
  );
}
