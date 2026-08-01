import TermsContact from '@/features/terms-of-service/components/TermsContact';
import TermsHero from '@/features/terms-of-service/components/TermsHero';
import TermsHighlights from '@/features/terms-of-service/components/TermsHighlights';
import TermsPolicyBody from '@/features/terms-of-service/components/TermsPolicyBody';

export default function TermsOfServiceView() {
  return (
    <div className="-mb-20 -mt-12 -translate-x-1/2 relative left-1/2 w-screen bg-white text-slate-800">
      <TermsHero />
      <TermsHighlights />
      <TermsPolicyBody />
      <TermsContact />
    </div>
  );
}
