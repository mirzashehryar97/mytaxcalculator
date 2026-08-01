import PolicyHighlights from '@/components/ui/policy/PolicyHighlights';

import { PRIVACY_HIGHLIGHTS, PRIVACY_HIGHLIGHTS_COPY } from '@/features/privacy-policy/lib/content';

export default function PrivacyHighlights() {
  return (
    <PolicyHighlights
      headingId="privacy-highlights-heading"
      copy={PRIVACY_HIGHLIGHTS_COPY}
      highlights={PRIVACY_HIGHLIGHTS}
    />
  );
}
