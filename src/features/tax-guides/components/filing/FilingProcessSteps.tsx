import TaxGuideArticleSectionHeading from '@/features/tax-guides/components/article/TaxGuideArticleSectionHeading';
import {
  FILING_PROCESS_STEPS,
  FILING_SECTION_COPY,
} from '@/features/tax-guides/lib/filingTaxReturnContent';

export default function FilingProcessSteps() {
  return (
    <section aria-labelledby="filing-steps">
      <TaxGuideArticleSectionHeading id="filing-steps" number={4}>
        {FILING_SECTION_COPY.filingStepsTitle}
      </TaxGuideArticleSectionHeading>
      <ol className="mt-4 overflow-hidden rounded-lg border border-slate-300 bg-white shadow-sm">
        {FILING_PROCESS_STEPS.map((step, index) => (
          <li
            key={step.id}
            id={step.id}
            className={`scroll-mt-24 px-4 py-3 sm:px-5 ${index > 0 ? 'border-slate-200 border-t' : ''}`}
          >
            <div className="relative flex gap-4">
              <div className="relative flex shrink-0 justify-center">
                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-800 font-bold text-sm text-white">
                  {step.number}
                </span>
                {index < FILING_PROCESS_STEPS.length - 1 ? (
                  <span
                    className="absolute top-8 bottom-[-21px] w-px bg-emerald-200"
                    aria-hidden="true"
                  />
                ) : null}
              </div>
              <div className="min-w-0 pb-0.5">
                <h3 className="font-bold text-[#0b1736] text-[15px] leading-5 sm:text-base">
                  {step.title}
                </h3>
                <p className="mt-0.5 text-[13px] text-slate-600 leading-5 sm:text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
