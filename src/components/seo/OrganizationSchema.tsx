import { JsonLd } from "./JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://idealbathware.com";

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Ideal Bathware",
        url: BASE_URL,
        logo: `${BASE_URL}/logo.png`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+91-98765-43210",
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: "English",
        },
        sameAs: ["https://wa.me/911234567890"],
      }}
    />
  );
}
