import { ImageResponse } from 'next/og';

import SocialCard from '@/components/ui/SocialCard';

import { SOLAR_SOCIAL_IMAGE_COPY } from '@/features/budget-comparison/lib/solarContent';

export const alt = SOLAR_SOCIAL_IMAGE_COPY.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<SocialCard copy={SOLAR_SOCIAL_IMAGE_COPY} />, size);
}
