import { ImageResponse } from 'next/og';

import SocialCard from '@/components/ui/SocialCard';

import { VEHICLE_TOKEN_SOCIAL_IMAGE_COPY } from '@/features/vehicle-tax/lib/content';

export const alt = VEHICLE_TOKEN_SOCIAL_IMAGE_COPY.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<SocialCard copy={VEHICLE_TOKEN_SOCIAL_IMAGE_COPY} />, size);
}
