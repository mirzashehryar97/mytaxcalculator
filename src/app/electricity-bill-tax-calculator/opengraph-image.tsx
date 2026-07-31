import { ImageResponse } from 'next/og';

import SocialCard from '@/components/ui/SocialCard';

import { WITHHOLDING_SOCIAL_IMAGE_COPY } from '@/features/withholding-tax/lib/content';

const copy = WITHHOLDING_SOCIAL_IMAGE_COPY.electricity;

export const alt = copy.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<SocialCard copy={copy} />, size);
}
