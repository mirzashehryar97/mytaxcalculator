import { Car, Check } from 'lucide-react';

import CalculatorBadgeHero from '@/components/calculator/CalculatorBadgeHero';

import { VEHICLE_REGISTRATION_PAGE_COPY } from '@/features/vehicle-tax/lib/content';

export default function VehicleRegistrationHero() {
  return (
    <CalculatorBadgeHero
      eyebrow={VEHICLE_REGISTRATION_PAGE_COPY.eyebrow}
      eyebrowIcon={Car}
      title={VEHICLE_REGISTRATION_PAGE_COPY.title}
      subtitle={VEHICLE_REGISTRATION_PAGE_COPY.subtitle}
      badges={VEHICLE_REGISTRATION_PAGE_COPY.badges}
      badgeIcon={Check}
    />
  );
}
