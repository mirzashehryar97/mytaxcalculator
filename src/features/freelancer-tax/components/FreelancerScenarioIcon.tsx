import { Briefcase, Building2, Globe2 } from 'lucide-react';

import type { FreelancerScenarioId } from '@/features/freelancer-tax/types';

interface FreelancerScenarioIconProps {
  scenarioId: FreelancerScenarioId;
}

export default function FreelancerScenarioIcon({ scenarioId }: FreelancerScenarioIconProps) {
  if (scenarioId === 'all-export-income') {
    return <Globe2 className="h-7 w-7 text-emerald-600" aria-hidden="true" />;
  }
  if (scenarioId === 'mixed-income') {
    return <Briefcase className="h-7 w-7 text-violet-600" aria-hidden="true" />;
  }
  return <Building2 className="h-7 w-7 text-blue-600" aria-hidden="true" />;
}
