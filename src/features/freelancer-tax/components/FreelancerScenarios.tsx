import FreelancerScenarioIcon from '@/features/freelancer-tax/components/FreelancerScenarioIcon';
import {
  FREELANCER_SCENARIOS,
  FREELANCER_SECTION_COPY,
} from '@/features/freelancer-tax/lib/content';

export default function FreelancerScenarios() {
  return (
    <section className="rounded-2xl border border-gray-200 bg-gray-50/70 p-5 sm:p-6">
      <h2 className="font-bold text-gray-900 text-lg">{FREELANCER_SECTION_COPY.scenariosTitle}</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {FREELANCER_SCENARIOS.map((scenario) => (
          <article key={scenario.id} className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="flex gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50">
                <FreelancerScenarioIcon scenarioId={scenario.id} />
              </span>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">{scenario.title}</h3>
                <p className="mt-1.5 text-gray-600 text-xs leading-relaxed">
                  {scenario.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
