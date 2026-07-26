import { ImageResponse } from 'next/og';

import CalculatorSocialCard from '@/components/calculator/CalculatorSocialCard';

import { REVERSE_SALARY_SOCIAL_IMAGE_COPY } from '@/features/reverse-salary/lib/content';

export const alt = REVERSE_SALARY_SOCIAL_IMAGE_COPY.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(<CalculatorSocialCard copy={REVERSE_SALARY_SOCIAL_IMAGE_COPY} />, size);
}
