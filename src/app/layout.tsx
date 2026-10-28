import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bantubrand.com"),
  title: "Bantu Brand — Média Podcast Créatif Africain & Studio de Conseil",
  description:
    "Donner une voix, une visibilité et un espace aux créatifs africains. Média podcast, vitrine de talents et studio de consultance et d'accompagnement en communication de marque fondé par Doris Kabemba à Kinshasa.",
  keywords: [
    "Bantu Brand",
    "Podcast Africain",
    "Créatifs Africains",
    "Doris Kabemba",
    "Culture Africaine Contemporaine",
    "Kinshasa Média",
    "Consultance en communication",
    "Accompagnement en communication",
    "Branding Kinshasa",
    "Mode et Design Africain",
    "MOKILI",
  ],
  authors: [{ name: "Doris Kabemba" }, { name: "Bantu Brand" }],
  creator: "Bantu Brand & MOKILI",
  publisher: "Bantu Brand",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://bantubrand.com",
    title: "Bantu Brand — Média Podcast Créatif Africain",
    description:
      "Donner une voix, une visibilité et un espace aux créatifs africains. Découvrez nos épisodes exclusifs et nos offres de conseil stratégique.",
    siteName: "Bantu Brand",
    images: [
      {
        url: "/images/logo-bantu-brand.jpg",
        width: 1200,
        height: 630,
        alt: "Bantu Brand — Média Podcast Créatif Africain",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bantu Brand — Média Podcast Créatif Africain",
    description:
      "Donner une voix, une visibilité et un espace aux créatifs africains. Épisodes, créateurs et solutions de marque.",
    images: ["/images/logo-bantu-brand.jpg"],
    creator: "@bantubrand",
  },
  icons: {
    icon: "/images/logo-bantu-brand.jpg",
    apple: "/images/logo-bantu-brand.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org JSON-LD structuré pour Média / Podcast & Organisation
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://bantubrand.com/#organization",
        name: "Bantu Brand",
        url: "https://bantubrand.com",
        logo: "https://bantubrand.com/images/logo-bantu-brand.jpg",
        founder: {
          "@type": "Person",
          name: "Doris Kabemba",
          jobTitle: "Fondateur & Directeur Artistique",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kinshasa",
          addressCountry: "CD",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+243971245105",
          contactType: "customer service",
          email: "bantu.brand@gmail.com",
        },
        sameAs: [
          "https://instagram.com/bantubrand",
          "https://facebook.com/bantubrand",
          "https://linkedin.com/company/bantu-brand",
          "https://youtube.com/@bantubrand",
        ],
      },
      {
        "@type": "PodcastSeries",
        "@id": "https://bantubrand.com/#podcast",
        name: "Bantu Brand Podcast",
        description:
          "Le podcast créatif africain qui donne de la visibilité aux talents du continent, à leur culture, leurs parcours et leurs marques.",
        url: "https://bantubrand.com",
        inLanguage: "fr",
        author: {
          "@type": "Person",
          name: "Doris Kabemba",
        },
        publisher: {
          "@id": "https://bantubrand.com/#organization",
        },
      },
    ],
  };

  return (
    <html lang="fr" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-bantu-dark text-bantu-cream font-sans">
        {children}
      </body>
    </html>
  );
}
