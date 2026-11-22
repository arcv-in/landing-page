import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Arcv | Conciliação Financeira Automática & Livro Razão",
  description:
    "Conecte bancos, meios de pagamento e ERP. Conciliação financeira em tempo real com precisão de centavos.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="bg-[#F3F3F3]">
      <body className={`${inter.variable} antialiased bg-[#F3F3F3] text-[#1D1D1D]`}>
        {children}
      </body>
    </html>
  );
}
