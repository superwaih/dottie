import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MantineProvider } from "@mantine/core";

// Load custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
import "@mantine/core/styles.css";

// SEO Metadata
export const metadata: Metadata = {
  title: "World Dot Map Generator | Create Visual Maps",
  description: "Generate dot maps for any country in the world easily. Customize your maps for data visualization, population density, or geographical representation.",
  keywords: "dot map generator, world map, country map generator, population density, geographic data, data visualization",
  authors: [{name: "Shittu Adewale", url: 'https://wale.vercel.app'}],
  openGraph: {
    title: "World Dot Map Generator",
    description: "Create and customize dot maps for any country.",
    url: "https://yourwebsite.com",
    images: [
      {
        url: "https://yourwebsite.com/images/og-image.jpg",
        width: 800,
        height: 600,
        alt: "World Dot Map Generator Preview",
      },
    ],
    siteName: "World Dot Map Generator",
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    creator: "@yourtwitterhandle",
    title: "World Dot Map Generator",
    description: "Easily generate dot maps for any country in the world.",
    images: "https://yourwebsite.com/images/twitter-image.jpg",
  },
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Meta tags for SEO */}
        <meta name="description" content="Generate dot maps for any country in the world easily. Customize your maps for data visualization, population density, or geographical representation." />
        <meta name="keywords" content="dot map generator, world map, country map generator, population density, geographic data, data visualization" />
        <meta property="og:title" content="World Dot Map Generator" />
        <meta property="og:description" content="Create and customize dot maps for any country." />
        <meta property="og:image" content="https://yourwebsite.com/images/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="World Dot Map Generator" />
        <meta name="twitter:description" content="Easily generate dot maps for any country in the world." />
        <meta name="twitter:image" content="https://yourwebsite.com/images/twitter-image.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
