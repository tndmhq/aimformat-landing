import type { Metadata, Viewport } from "next";
import { Fraunces, Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

const SITE_URL = "https://aimformat.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: ".aim: the open document format for the AI era",
    template: "%s · .aim",
  },
  description:
    "There is no Markdown for layout-rich, AI-native documents. So we set one in type. .aim is valid HTML5 with a Tailwind subset, extended with stable chunks, slides, and a three-lane file that makes track-changes a property of the document itself. Open source, MIT. By Tndm.",
  keywords: [
    ".aim",
    "aim format",
    "open document format",
    "AI document format",
    "track changes",
    "MCP",
    "HTML",
    "Tailwind",
    "Tndm",
    "agent-native documents",
  ],
  authors: [{ name: "Tndm" }],
  creator: "Tndm",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: ".aim: the open document format for the AI era",
    description:
      "An open file format where humans and AI agents co-author the same rich document. Every change proposed, reviewed, and tracked. Valid HTML5 + Tailwind. MIT. By Tndm.",
    siteName: ".aim",
  },
  twitter: {
    card: "summary_large_image",
    title: ".aim: the open document format for the AI era",
    description:
      "Markdown for the age of agents, finally with layout. Valid HTML5 + Tailwind, stable chunks, slides, and native three-lane track changes. Open source, MIT. By Tndm.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f4ecdd",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${newsreader.variable} ${plexMono.variable}`}
    >
      <body className="relative flex min-h-dvh flex-col">
        <a
          href="#main"
          className="label-mono sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-ink focus:bg-surface focus:px-3 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
