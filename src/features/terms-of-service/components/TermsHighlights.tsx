import PolicyHighlights from '@/components/ui/policy/PolicyHighlights';

import { TERMS_HIGHLIGHTS, TERMS_HIGHLIGHTS_COPY } from '@/features/terms-of-service/lib/content';

export default function TermsHighlights() {
  return (
    <PolicyHighlights
      headingId="terms-highlights-heading"
      copy={TERMS_HIGHLIGHTS_COPY}
      highlights={TERMS_HIGHLIGHTS}
    />
  );
}
