interface TaxGuidesSectionHeadingProps {
  id: string;
  title: string;
  description?: string;
  status?: string;
}

export default function TaxGuidesSectionHeading({
  id,
  title,
  description,
  status,
}: TaxGuidesSectionHeadingProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center gap-3">
        <h2 id={id} className="font-bold text-2xl text-slate-900 tracking-tight sm:text-3xl">
          {title}
        </h2>
        {status ? (
          <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-800 text-xs uppercase tracking-wide ring-1 ring-amber-200">
            {status}
          </span>
        ) : null}
      </div>
      {description ? <p className="mt-2 text-slate-600 leading-relaxed">{description}</p> : null}
    </div>
  );
}
