import { ImageResponse } from 'next/og';

import SocialCard from '@/components/ui/SocialCard';

import { VEHICLES_SOCIAL_IMAGE_COPY } from '@/features/budget-comparison/lib/vehiclesContent';

export const alt = VEHICLES_SOCIAL_IMAGE_COPY.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<SocialCard copy={VEHICLES_SOCIAL_IMAGE_COPY} />, size);
}
