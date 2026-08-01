import PolicyBodyLayout from '@/components/ui/policy/PolicyBodyLayout';

import PrivacyPolicySection from '@/features/privacy-policy/components/PrivacyPolicySection';
import { PRIVACY_POLICY_COPY, PRIVACY_SECTIONS } from '@/features/privacy-policy/lib/content';

export default function PrivacyPolicyBody() {
  return (
    <PolicyBodyLayout
      headingId="privacy-policy-heading"
      copy={PRIVACY_POLICY_COPY}
      sections={PRIVACY_SECTIONS}
    >
      {PRIVACY_SECTIONS.map((section) => (
        <PrivacyPolicySection key={section.id} section={section} />
      ))}
    </PolicyBodyLayout>
  );
}
