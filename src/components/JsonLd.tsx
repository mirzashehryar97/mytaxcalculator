import type { JsonLd as JsonLdData } from '@/lib/seo';
import { serializeJsonLd } from '@/lib/serializeJsonLd';

/** Renders one or more JSON-LD structured-data blocks as <script> tags. */
export default function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  const blocks = Array.isArray(data) ? data : [data];
  return (
    <>
      {blocks.map((block, index) => (
        <script key={index} type="application/ld+json">
          {serializeJsonLd(block)}
        </script>
      ))}
    </>
  );
}
