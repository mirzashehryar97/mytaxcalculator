import { ImageResponse } from 'next/og';

import SocialCard from '@/components/ui/SocialCard';

import { DEFENCE_SOCIAL_IMAGE_COPY } from '@/features/budget-comparison/lib/defenceContent';

export const alt = DEFENCE_SOCIAL_IMAGE_COPY.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<SocialCard copy={DEFENCE_SOCIAL_IMAGE_COPY} />, size);
}
