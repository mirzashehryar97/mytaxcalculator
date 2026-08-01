import { ImageResponse } from 'next/og';

import SocialCard from '@/components/ui/SocialCard';

import { TERMS_SOCIAL_IMAGE_COPY } from '@/features/terms-of-service/lib/content';

export const alt = TERMS_SOCIAL_IMAGE_COPY.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<SocialCard copy={TERMS_SOCIAL_IMAGE_COPY} />, size);
}
