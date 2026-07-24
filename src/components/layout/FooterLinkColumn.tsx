import Link from 'next/link';

import type { FooterLink } from '@/components/layout/footerContent';

const FOOTER_LINK_CLASS = 'text-emerald-100/70 hover:text-white text-sm transition-colors';

interface FooterLinkColumnProps {
  title: string;
  links: readonly FooterLink[];
  externalLinks?: readonly FooterLink[];
}

export default function FooterLinkColumn({ title, links, externalLinks }: FooterLinkColumnProps) {
  return (
    <div>
      <h2 className="mb-4 font-bold text-sm text-white uppercase tracking-wider">{title}</h2>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={FOOTER_LINK_CLASS}>
              {link.label}
            </Link>
          </li>
        ))}
        {externalLinks?.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={FOOTER_LINK_CLASS}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
