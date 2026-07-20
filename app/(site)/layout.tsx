import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "@styles/globals.css";
import { Layout } from "@components/common";
import { getSettings } from "../../content/reader";

// Hardcoded fallbacks — identical to the pre-CMS static `metadata` export.
// Used verbatim if repository content is missing on a fresh clone.
const FALLBACK = {
  siteName: "Amir Seraj",
  siteUrl: "https://amirseraj.ir",
  description:
    "Machines can learn to notice people — I teach them. Affective computing, emotion recognition and interactive systems. MSc HCI, Genova.",
  ogImage: "/images/social-card.png",
  twitterHandle: "@amirseraj",
};

export async function generateMetadata(): Promise<Metadata> {
  let settings: Awaited<ReturnType<typeof getSettings>> | null = null;
  try {
    settings = await getSettings();
  } catch (err) {
    console.warn("[layout] settings unavailable — using static metadata:", err);
  }

  const siteName = settings?.siteName ?? FALLBACK.siteName;
  const siteUrl = settings?.siteUrl ?? FALLBACK.siteUrl;
  const description = settings?.defaultDescription ?? FALLBACK.description;
  const ogImage = settings?.defaultOgImage ?? FALLBACK.ogImage;
  const twitterHandle = settings?.twitterHandle ?? FALLBACK.twitterHandle;

  return {
    metadataBase: new URL(siteUrl),
    title: `${siteName} | HCI Researcher & Developer`,
    description,
    authors: [{ name: siteName }],
    openGraph: {
      siteName,
      images: [ogImage],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: twitterHandle,
      creator: twitterHandle,
    },
    icons: {
      icon: [
        { url: "/favicon/icon.svg", type: "image/svg+xml" },
        { url: "/favicon/icon.png", type: "image/png" },
      ],
      apple: "/favicon/icon.png",
    },
    manifest: "/favicon/site.webmanifest",
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#202020" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
