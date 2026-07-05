import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@styles/globals.css";
import { Layout } from "@components/common";

export const metadata: Metadata = {
  metadataBase: new URL("https://amirseraj.ir"),
  title: "Amir Seraj | HCI Researcher & Developer",
  description:
    "Machines can learn to notice people — I teach them. Affective computing, emotion recognition and interactive systems. MSc HCI, Genova.",
  authors: [{ name: "Amir Seraj" }],
  openGraph: {
    siteName: "Amir Seraj",
    images: ["/images/banner.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@amirseraj",
    creator: "@amirseraj",
  },
  icons: { icon: "/favicon/icon.png", apple: "/favicon/icon.png" },
  manifest: "/favicon/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#202020" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500&family=Syne+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontSize: 20 }}>
        <Layout>{children}</Layout>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
