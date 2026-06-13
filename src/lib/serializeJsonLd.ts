import type { JsonLd as JsonLdData } from '@/lib/seo';

/** Escapes JSON so it can be safely embedded inside a <script> tag. */
export function serializeJsonLd(data: JsonLdData): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
