import { ImageResponse } from 'next/og';

import SocialCard from '@/components/ui/SocialCard';

import { CORPORATE_SOCIAL_IMAGE_COPY } from '@/features/corporate-tax/lib/modeContent';

export const alt = CORPORATE_SOCIAL_IMAGE_COPY['minimum-tax'].title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<SocialCard copy={CORPORATE_SOCIAL_IMAGE_COPY['minimum-tax']} />, size);
}
