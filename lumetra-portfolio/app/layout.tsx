import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: "Lumetra - Helping Startups Grow",
  description: "Lumetra is a premium and modern creative agency specializing in helping startups grow through stunning design and development.",
  openGraph: {
    title: "Lumetra - Helping Startups Grow",
    description: "Premium creative agency for startups.",
    url: "https://lumetra.vercel.app", // Replace with your actual domain
    siteName: "Lumetra",
    images: [
      {
        url: "/og-image.jpg", // Create and add an OG image in the /public folder
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}