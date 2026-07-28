import Image from 'next/image';

import { ExternalLink } from 'lucide-react';

import TaxGuidesSectionHeading from '@/features/tax-guides/components/TaxGuidesSectionHeading';
import { OFFICIAL_TAX_RESOURCES, TAX_GUIDES_PAGE_COPY } from '@/features/tax-guides/lib/content';

export default function OfficialResources() {
  return (
    <section aria-labelledby="official-tax-resources-heading">
      <TaxGuidesSectionHeading
        id="official-tax-resources-heading"
        title={TAX_GUIDES_PAGE_COPY.resourcesTitle}
      />
      <div className="grid gap-4 md:grid-cols-3">
        {OFFICIAL_TAX_RESOURCES.map((resource) => {
          const Icon = 'icon' in resource ? resource.icon : undefined;
          const resourceImage = 'image' in resource ? resource.image : undefined;

          return (
            <a
              key={resource.id}
              href={resource.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group hover:-translate-y-0.5 flex items-center gap-3 rounded-xl border-[1.5px] border-slate-300 bg-white p-4 shadow-sm transition duration-200 hover:border-emerald-400 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-200"
            >
              <span className="flex h-12 w-20 shrink-0 items-center overflow-hidden text-emerald-800">
                {resourceImage ? (
                  <Image
                    src={resourceImage.src}
                    alt={resourceImage.alt}
                    width={resourceImage.width}
                    height={resourceImage.height}
                    className={
                      resourceImage.cropToMark
                        ? 'h-9 w-auto max-w-none shrink-0 object-left'
                        : 'h-auto max-h-10 w-full object-contain object-left'
                    }
                  />
                ) : null}
                {Icon ? <Icon className="h-12 w-12" strokeWidth={1.65} aria-hidden="true" /> : null}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-[13px] text-slate-900 leading-snug">
                  {resource.title}
                </span>
                <span className="mt-1 block text-slate-500 text-xs">{resource.description}</span>
              </span>
              <ExternalLink
                className="h-4 w-4 shrink-0 self-start text-slate-400 transition-colors group-hover:text-emerald-700"
                aria-hidden="true"
              />
            </a>
          );
        })}
      </div>
    </section>
  );
}
