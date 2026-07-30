import { CalendarClock, Check } from 'lucide-react';

import CalculatorBadgeHero from '@/components/calculator/CalculatorBadgeHero';

import { VEHICLE_TOKEN_PAGE_COPY } from '@/features/vehicle-tax/lib/content';

export default function VehicleTokenHero() {
  return (
    <CalculatorBadgeHero
      eyebrow={VEHICLE_TOKEN_PAGE_COPY.eyebrow}
      eyebrowIcon={CalendarClock}
      title={VEHICLE_TOKEN_PAGE_COPY.title}
      subtitle={VEHICLE_TOKEN_PAGE_COPY.subtitle}
      badges={VEHICLE_TOKEN_PAGE_COPY.badges}
      badgeIcon={Check}
    />
  );
}
