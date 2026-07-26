import JobOfferComparisonFaq from '@/features/salary-increment/components/JobOfferComparisonFaq';
import JobOfferComparisonHero from '@/features/salary-increment/components/JobOfferComparisonHero';
import JobOfferComparisonMethodology from '@/features/salary-increment/components/JobOfferComparisonMethodology';
import JobOfferComparisonSources from '@/features/salary-increment/components/JobOfferComparisonSources';
import SalaryComparisonPage from '@/features/salary-increment/components/SalaryComparisonPage';
import { JOB_OFFER_COMPARISON_ROUTE } from '@/features/salary-increment/lib/content';

export default function JobOfferComparisonView() {
  return (
    <SalaryComparisonPage
      mode="job-offer"
      currentHref={JOB_OFFER_COMPARISON_ROUTE}
      hero={<JobOfferComparisonHero />}
      methodology={<JobOfferComparisonMethodology />}
      sources={<JobOfferComparisonSources />}
      faq={<JobOfferComparisonFaq />}
    />
  );
}
