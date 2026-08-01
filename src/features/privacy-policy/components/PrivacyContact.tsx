import PolicyContact from '@/components/ui/policy/PolicyContact';

import { PRIVACY_CONTACT_COPY } from '@/features/privacy-policy/lib/content';

export default function PrivacyContact() {
  return <PolicyContact headingId="privacy-contact" copy={PRIVACY_CONTACT_COPY} />;
}
