import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "@/styles/globals.css";
import { OrganizationSchema } from "@/components/seo/OrganizationSchema";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ideal Bathware — Premium Sanitaryware",
    template: "%s | Ideal Bathware",
  },
  description:
    "Discover Ideal Bathware's premium sanitaryware collections — closets, basins, and bathroom accessories crafted with quality and elegance.",
  keywords: ["sanitaryware", "bathware", "water closet", "wash basin", "bathroom fittings"],
  authors: [{ name: "Ideal Bathware" }],
  creator: "Ideal Bathware",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Ideal Bathware",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:font-medium focus:shadow-lg"
        >
          Skip to main content
        </a>
        <OrganizationSchema />
        {children}
      </body>
    </html>
  );
}
