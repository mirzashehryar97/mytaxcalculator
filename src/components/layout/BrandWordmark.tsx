type BrandWordmarkProps = {
  /** `dark` for light backgrounds (header), `light` for the dark footer. */
  tone?: 'dark' | 'light';
  /** `sm` for the mobile drawer, `md` everywhere else. */
  size?: 'md' | 'sm';
};

export default function BrandWordmark({ tone = 'dark', size = 'md' }: BrandWordmarkProps) {
  const isLight = tone === 'light';
  const isSmall = size === 'sm';

  return (
    <span className={`leading-none ${isLight ? 'text-white' : 'text-slate-950'}`}>
      <span className={`font-bold tracking-tight ${isSmall ? 'text-base' : 'text-xl'}`}>
        My<span className={isLight ? 'text-emerald-400' : 'text-emerald-600'}>Tax</span>Calculator
      </span>
      <span className={`ml-0.5 font-bold ${isSmall ? 'text-xs' : 'text-sm'}`}>.pk</span>
    </span>
  );
}
