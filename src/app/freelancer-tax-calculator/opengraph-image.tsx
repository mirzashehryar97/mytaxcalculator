import { ImageResponse } from 'next/og';

import SocialCard from '@/components/ui/SocialCard';

import { FREELANCER_SOCIAL_IMAGE_COPY } from '@/features/freelancer-tax/lib/content';

export const alt = FREELANCER_SOCIAL_IMAGE_COPY.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<SocialCard copy={FREELANCER_SOCIAL_IMAGE_COPY} />, size);
}
