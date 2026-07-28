import { ImageResponse } from 'next/og';

import SocialCard from '@/components/ui/SocialCard';

import { JOB_OFFER_COMPARISON_SOCIAL_IMAGE_COPY } from '@/features/salary-increment/lib/content';

export const alt = JOB_OFFER_COMPARISON_SOCIAL_IMAGE_COPY.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<SocialCard copy={JOB_OFFER_COMPARISON_SOCIAL_IMAGE_COPY} />, size);
}
