import { ImageResponse } from 'next/og';

import SocialCard from '@/components/ui/SocialCard';

import { FREELANCERS_IT_SOCIAL_IMAGE_COPY } from '@/features/budget-comparison/lib/freelancersItContent';

export const alt = FREELANCERS_IT_SOCIAL_IMAGE_COPY.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<SocialCard copy={FREELANCERS_IT_SOCIAL_IMAGE_COPY} />, size);
}
