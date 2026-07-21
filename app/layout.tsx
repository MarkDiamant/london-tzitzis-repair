import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/logo1.png",
    shortcut: "/logo1.png",
    apple: "/logo1.png",
  },
  title: "London Tzitzis Repair",
  description:
    "Repair of tzitzis strings on tallis and tzitzis garments. From £6 per corner. Collection available in NW11 and NW4.",
  openGraph: {
    title: "London Tzitzis Repair",
    description:
      "Repair of tzitzis strings on tallis and tzitzis garments. From £6 per corner.",
    url: "https://londontzitzisrepair.co.uk",
    siteName: "London Tzitzis Repair",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "London Tzitzis Repair",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "London Tzitzis Repair",
    description: "Repair of tzitzis strings on tallis and tzitzis garments.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
