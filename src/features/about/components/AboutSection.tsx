interface AboutSectionProps {
  /** Anchor target, when the section is linked to from elsewhere on the page. */
  id?: string;
  /** Background utilities for the full-bleed band. */
  className?: string;
  labelledBy?: string;
  children: React.ReactNode;
}

/** Full-bleed band + the shared inner container every About section is built on. */
export default function AboutSection({ id, className, labelledBy, children }: AboutSectionProps) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={className}>
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-[4.5rem]">
        {children}
      </div>
    </section>
  );
}
