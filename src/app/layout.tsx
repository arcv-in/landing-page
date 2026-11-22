import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = "https://arcv.in";

export const viewport: Viewport = {
  themeColor: "#1D1D1D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Arcv | Toda a sua movimentação financeira. 100% conciliada.",
    template: "%s | Arcv",
  },
  description:
    "Conecte bancos PJ, adquirentes e ERP em minutos. O Arcv audita cada entrada e saída no seu livro razão em tempo real. Sem furos de caixa e sem planilhas manuais.",
  keywords: [
    "conciliação financeira",
    "livro razão",
    "auditoria 3-way",
    "conciliação bancária",
    "open finance",
    "gestão de caixa",
    "partidas dobradas",
    "auditoria de taxas",
    "conferência de extrato",
    "ERP financeiro",
    "fintech",
    "arcv",
  ],
  authors: [{ name: "Arcv", url: siteUrl }],
  creator: "Arcv",
  publisher: "Arcv",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: "Arcv | Toda a sua movimentação financeira. 100% conciliada.",
    description:
      "Conecte bancos, adquirentes e ERP em minutos. Auditoria em 3 vias, conferência de taxas e livro razão contínuo em tempo real.",
    url: siteUrl,
    siteName: "Arcv — Financial Archive",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Arcv — Toda a sua movimentação financeira. 100% conciliada.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arcv | Toda a sua movimentação financeira. 100% conciliada.",
    description:
      "Conecte bancos, adquirentes e ERP em minutos. O Arcv audita cada entrada e saída no seu livro razão em tempo real.",
    images: ["/og-image.jpg"],
    creator: "@arcv_in",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://arcv.in/#organization",
      "name": "Arcv",
      "url": "https://arcv.in",
      "logo": "https://arcv.in/logo.svg",
      "description": "Infraestrutura soberana de conciliação financeira automatizada e livro razão em tempo real.",
    },
    {
      "@type": "WebSite",
      "@id": "https://arcv.in/#website",
      "url": "https://arcv.in",
      "name": "Arcv",
      "publisher": {
        "@id": "https://arcv.in/#organization",
      },
    },
    {
      "@type": "SoftwareApplication",
      "name": "Arcv",
      "operatingSystem": "Web",
      "applicationCategory": "FinanceApplication, BusinessApplication",
      "description": "Auditoria de extratos bancários, adquirentes e ERP em tempo real com partidas dobradas.",
      "url": "https://arcv.in",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "BRL",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="bg-[#F3F3F3]">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} antialiased bg-[#F3F3F3] text-[#1D1D1D]`}>
        {children}
      </body>
    </html>
  );
}
