import { ImageResponse } from 'next/og';

import SocialCard from '@/components/ui/SocialCard';

import { FILING_TAX_RETURN_SOCIAL_IMAGE_COPY } from '@/features/tax-guides/lib/filingTaxReturnContent';

export const alt = FILING_TAX_RETURN_SOCIAL_IMAGE_COPY.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<SocialCard copy={FILING_TAX_RETURN_SOCIAL_IMAGE_COPY} />, size);
}
