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
  metadataBase: new URL("https://www.londontzitzisrepair.co.uk"),
  icons: {
    icon: "/logo1.png",
    shortcut: "/logo1.png",
    apple: "/logo1.png",
  },
  title: "London Tzitzis Repair",
  description:
    "Tallis tzitzis string replacement and repairs. From £6 per corner. Collection available in NW11 and NW4.",
  openGraph: {
    title: "London Tzitzis Repair",
    description:
      "Tallis tzitzis string replacement and repairs. From £6 per corner.",
    url: "https://www.londontzitzisrepair.co.uk",
    siteName: "London Tzitzis Repair",
    images: [
      {
        url: "/opengraph-image?v=2026090703",
        width: 1200,
        height: 630,
        alt: "London Tzitzis Repair - Tallis Tzitzis String Replacement & Repairs",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "London Tzitzis Repair",
    description: "Tallis tzitzis string replacement and repairs. From £6 per corner.",
    images: ["/opengraph-image?v=2026090703"],
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
