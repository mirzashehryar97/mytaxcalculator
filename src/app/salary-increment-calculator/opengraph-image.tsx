import { ImageResponse } from 'next/og';

import SocialCard from '@/components/ui/SocialCard';

import { SALARY_INCREMENT_SOCIAL_IMAGE_COPY } from '@/features/salary-increment/lib/content';

export const alt = SALARY_INCREMENT_SOCIAL_IMAGE_COPY.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<SocialCard copy={SALARY_INCREMENT_SOCIAL_IMAGE_COPY} />, size);
}
