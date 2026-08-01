import PolicySection from '@/components/ui/policy/PolicySection';

import PrivacyProviderCard from '@/features/privacy-policy/components/PrivacyProviderCard';
import type { PrivacySection } from '@/features/privacy-policy/types';

interface PrivacyPolicySectionProps {
  section: PrivacySection;
}

export default function PrivacyPolicySection({ section }: PrivacyPolicySectionProps) {
  return (
    <PolicySection section={section}>
      {section.providers ? (
        <div className="mt-6 grid gap-4 sm:pl-[3.75rem] md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3">
          {section.providers.map((provider) => (
            <PrivacyProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      ) : null}
    </PolicySection>
  );
}
