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
  metadataBase: new URL("https://verk.club"),
  title: {
    default: "VERKSMIÐJAN",
    template: "%s | VERKSMIÐJAN",
  },
  description:
    "Verksmiðjan is an Icelandic music collective and record label. We release electronic music, hip-hop, and experimental sounds. Grjót hörð tónlist og góð skemmtun.",
  keywords: [
    "Verksmiðjan",
    "Icelandic music",
    "Iceland record label",
    "music collective Iceland",
    "Íslensk tónlist",
    "plötuútgáfa",
    "tónlistarsamtök",
    "Teknó",
    "Techno Iceland",
    "electronic music Iceland",
    "indie label Iceland",
  ],
  openGraph: {
    type: "website",
    locale: "is_IS",
    url: "https://verk.club",
    siteName: "VERKSMIÐJAN",
    title: "VERKSMIÐJAN — Icelandic Music Collective & Record Label",
    description:
      "Verksmiðjan is an Icelandic music collective and record label. Grjót hörð tónlist og góð skemmtun.",
    images: [
      {
        url: "/verksmidjan-logo.png",
        width: 709,
        height: 709,
        alt: "VERKSMIÐJAN",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VERKSMIÐJAN — Icelandic Music Collective & Record Label",
    description:
      "Verksmiðjan is an Icelandic music collective and record label. Grjót hörð tónlist og góð skemmtun.",
    images: ["/verksmidjan-logo.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MusicGroup",
  name: "Verksmiðjan",
  alternateName: ["VERKSMIÐJAN", "verk.club"],
  url: "https://verk.club",
  description:
    "Icelandic music collective and record label releasing dance music, electronic, and experimental sounds.",
  genre: ["Electronic", "Dance", "Techno", "House", "Experimental"],
  foundingLocation: {
    "@type": "Place",
    name: "Iceland",
    addressCountry: "IS",
  },
  sameAs: ["https://soundcloud.com/verksmidjan", "https://verk.bandcamp.com"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="is">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
