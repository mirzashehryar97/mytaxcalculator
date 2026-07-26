import { ImageResponse } from 'next/og';

import CalculatorSocialCard from '@/components/calculator/CalculatorSocialCard';

import { BUSINESS_SOCIAL_IMAGE_COPY } from '@/features/business-tax/lib/content';

export const alt = BUSINESS_SOCIAL_IMAGE_COPY.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<CalculatorSocialCard copy={BUSINESS_SOCIAL_IMAGE_COPY} />, size);
}
