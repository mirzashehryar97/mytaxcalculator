import PolicyBodyLayout from '@/components/ui/policy/PolicyBodyLayout';
import PolicySection from '@/components/ui/policy/PolicySection';

import { TERMS_POLICY_COPY, TERMS_SECTIONS } from '@/features/terms-of-service/lib/content';

export default function TermsPolicyBody() {
  return (
    <PolicyBodyLayout
      headingId="terms-policy-heading"
      copy={TERMS_POLICY_COPY}
      sections={TERMS_SECTIONS}
    >
      {TERMS_SECTIONS.map((section) => (
        <PolicySection key={section.id} section={section} />
      ))}
    </PolicyBodyLayout>
  );
}
