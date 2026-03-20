export function SchemaLabJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "SchemaLab",
          applicationCategory: "DeveloperApplication",
          operatingSystem: "Web Browser",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description:
            "Visual database schema designer. Generate SQL, Prisma, Drizzle and Mongoose schemas by drag-and-drop.",
          url: "https://schemalab.io",
          screenshot: "https://schemalab.io/og-image.png",
          featureList: [
            "Visual drag-and-drop canvas",
            "SQL code generation",
            "Prisma schema generation",
            "Drizzle ORM generation",
            "Mongoose schema generation",
            "Real-time collaboration",
          ],
        }),
      }}
    />
  )
}
