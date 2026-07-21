import type { Metadata } from "next";
import { absoluteUrl, languageAlternates, SITE_URL } from "./site";

interface BuildMetadataArgs {
  locale: string;
  /** Path without the locale prefix, e.g. "solutions/dfas". */
  path?: string;
  title: string;
  description: string;
  siteName?: string;
  /** Absolute or root-relative OG image path. */
  image?: string;
}

export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  siteName = "UROCK",
  image = "/og/default.png",
}: BuildMetadataArgs): Metadata {
  const url = absoluteUrl(locale, path);
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph: {
      type: "website",
      siteName,
      title,
      description,
      url,
      locale,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
