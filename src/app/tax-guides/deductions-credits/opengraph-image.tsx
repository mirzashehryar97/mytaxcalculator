import { ImageResponse } from 'next/og';

import SocialCard from '@/components/ui/SocialCard';

import { DEDUCTIONS_CREDITS_SOCIAL_IMAGE_COPY } from '@/features/tax-guides/lib/taxDeductionsCreditsContent';

export const alt = DEDUCTIONS_CREDITS_SOCIAL_IMAGE_COPY.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<SocialCard copy={DEDUCTIONS_CREDITS_SOCIAL_IMAGE_COPY} />, size);
}
