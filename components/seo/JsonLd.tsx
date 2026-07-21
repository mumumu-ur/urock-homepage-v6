import { SITE_URL, absoluteUrl } from "@/lib/seo/site";

export function OrganizationJsonLd({
  locale,
  name,
  description,
}: {
  locale: string;
  name: string;
  description: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    description,
    url: absoluteUrl(locale),
    logo: `${SITE_URL}/logos/UROCK_navy.svg`,
    sameAs: [] as string[],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
