import { ImageResponse } from 'next/og';

import SocialCard from '@/components/ui/SocialCard';

import { CAPITAL_GAINS_SOCIAL_IMAGE_COPY } from '@/features/capital-gains-tax/lib/content';

const copy = CAPITAL_GAINS_SOCIAL_IMAGE_COPY['mutual-funds'];

export const alt = copy.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<SocialCard copy={copy} />, size);
}
