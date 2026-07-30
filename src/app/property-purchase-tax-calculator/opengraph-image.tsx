import { ImageResponse } from 'next/og';

import SocialCard from '@/components/ui/SocialCard';

import { PROPERTY_SOCIAL_IMAGE_COPY } from '@/features/property-tax/lib/content';

export const alt = PROPERTY_SOCIAL_IMAGE_COPY.purchase.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<SocialCard copy={PROPERTY_SOCIAL_IMAGE_COPY.purchase} />, size);
}
