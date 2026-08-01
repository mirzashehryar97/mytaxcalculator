import PolicyContact from '@/components/ui/policy/PolicyContact';

import { TERMS_CONTACT_COPY } from '@/features/terms-of-service/lib/content';

export default function TermsContact() {
  return <PolicyContact headingId="terms-contact" copy={TERMS_CONTACT_COPY} />;
}
