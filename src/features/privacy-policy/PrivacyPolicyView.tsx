import PrivacyContact from '@/features/privacy-policy/components/PrivacyContact';
import PrivacyHero from '@/features/privacy-policy/components/PrivacyHero';
import PrivacyHighlights from '@/features/privacy-policy/components/PrivacyHighlights';
import PrivacyPolicyBody from '@/features/privacy-policy/components/PrivacyPolicyBody';

export default function PrivacyPolicyView() {
  return (
    <div className="-mb-20 -mt-12 -translate-x-1/2 relative left-1/2 w-screen bg-white text-slate-800">
      <PrivacyHero />
      <PrivacyHighlights />
      <PrivacyPolicyBody />
      <PrivacyContact />
    </div>
  );
}
