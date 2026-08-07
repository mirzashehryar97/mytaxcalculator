import {
  BarChart3,
  Calculator,
  Cookie,
  ExternalLink,
  FileClock,
  LockKeyhole,
  Mail,
  RefreshCw,
  Server,
  Settings2,
  ShieldCheck,
  UserRoundX,
  UsersRound,
} from 'lucide-react';

import { CONTACT_EMAIL, CONTACT_MAILTO } from '@/lib/contact';

import type {
  PrivacyHeroFact,
  PrivacyHighlight,
  PrivacyProvider,
  PrivacySection,
  PrivacyTrustBadge,
} from '@/features/privacy-policy/types';

export const PRIVACY_LAST_UPDATED = 'August 7, 2026';

export const PRIVACY_SOCIAL_IMAGE_COPY = {
  eyebrow: 'Privacy · My Tax Calculator',
  title: 'Your numbers stay with you',
  subtitle: 'Clear calculations. Limited analytics. No accounts.',
  features: 'Browser-based · No data sales · Plain-language policy',
  brand: 'My Tax Calculator',
} as const;

export const PRIVACY_HERO_COPY = {
  breadcrumb: 'Privacy Policy',
  eyebrow: 'Privacy, explained plainly',
  titleLines: ['Your numbers stay', 'with you.'],
  description:
    'Your financial amounts are calculated in your browser, not stored in an account or database. This policy explains the limited technical and usage data the site does handle.',
  reviewedLabel: `Last updated ${PRIVACY_LAST_UPDATED}`,
  summaryNote: 'A plain-language summary for mytaxcalculator.pk',
} as const;

export const PRIVACY_HERO_FACTS: readonly PrivacyHeroFact[] = [
  {
    id: 'amounts',
    label: 'Financial amounts',
    value: 'Browser only',
    tone: 'positive',
  },
  { id: 'accounts', label: 'Account required', value: 'No', tone: 'positive' },
  { id: 'analytics', label: 'Analytics', value: 'Limited usage data', tone: 'neutral' },
  { id: 'sale', label: 'Personal data sold', value: 'Never', tone: 'positive' },
];

export const PRIVACY_TRUST_BADGES: readonly PrivacyTrustBadge[] = [
  { id: 'local', label: 'Amounts stay local', icon: Calculator },
  { id: 'account', label: 'No account needed', icon: UserRoundX },
  { id: 'sale', label: 'No data sales', icon: ShieldCheck },
];

export const PRIVACY_HIGHLIGHTS_COPY = {
  eyebrow: 'Privacy at a glance',
  title: 'The important parts, up front',
  description:
    'We keep the calculator simple and stateless while measuring enough to maintain and improve the site.',
} as const;

export const PRIVACY_HIGHLIGHTS: readonly PrivacyHighlight[] = [
  {
    id: 'calculations',
    title: 'Calculations stay on your device',
    description:
      'Salary, income, expense, property and tax amounts are processed locally and are not included in analytics events.',
    icon: LockKeyhole,
  },
  {
    id: 'measurement',
    title: 'Measurement is limited',
    description:
      'We use analytics and performance tools to understand visits, device types and which calculators are useful.',
    icon: BarChart3,
  },
  {
    id: 'control',
    title: 'You stay in control',
    description:
      'You can block or clear analytics cookies, use Google’s opt-out tool, or contact us with a privacy request.',
    icon: Settings2,
  },
];

const PRIVACY_PROVIDERS: readonly PrivacyProvider[] = [
  {
    id: 'vercel-analytics',
    name: 'Vercel Web Analytics',
    description: 'Cookie-free, aggregated traffic measurement.',
    detail:
      'May record the page, referrer, approximate location, browser, operating system, device type and event time. Vercel says these data points are not tied to a person or IP address.',
    href: 'https://vercel.com/docs/analytics/privacy-policy',
    linkLabel: 'Vercel analytics privacy',
    icon: BarChart3,
  },
  {
    id: 'vercel-speed-insights',
    name: 'Vercel Speed Insights',
    description: 'Real-world page performance measurement.',
    detail:
      'Collects performance data such as page-loading and Core Web Vitals measurements so we can find and fix slow experiences.',
    href: 'https://vercel.com/docs/speed-insights',
    linkLabel: 'Vercel Speed Insights',
    icon: Server,
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Traffic and feature-usage measurement.',
    detail:
      'May receive page activity, approximate location, browser and device details, session information, and our calculator-use events. Google Analytics uses first-party cookies such as _ga and _ga_<container-id> to distinguish users and sessions.',
    href: 'https://support.google.com/analytics/answer/6004245',
    linkLabel: 'How Google Analytics handles data',
    icon: Cookie,
  },
];

export const PRIVACY_POLICY_COPY = {
  eyebrow: 'Full policy',
  title: 'How we handle information',
  introduction:
    'This Privacy Policy applies to mytaxcalculator.pk, its calculators, guides and embeddable calculator. “We”, “us” and “our” mean My Tax Calculator.',
  navigationLabel: 'On this page',
} as const;

export const PRIVACY_SECTIONS: readonly PrivacySection[] = [
  {
    id: 'calculator-data',
    number: '01',
    title: 'Calculator data',
    paragraphs: [
      'The site has no user accounts, authentication system or database for calculator entries. Monetary amounts you enter—such as salary, revenue, expenses, rent, purchase or sale values, bills and calculated results—are processed in your browser and are not sent to us as analytics event properties.',
      'Refreshing or closing the page normally clears those entries. We do not ask for your name, CNIC, email address or documents to use a calculator.',
      'Some non-monetary calculator-use events may include choices such as the calculator type, fiscal year, filer category, province, taxpayer type, transaction dates or another selected category. This helps us understand which parts of a calculator are used without receiving the monetary amounts entered or calculated.',
    ],
    icon: Calculator,
  },
  {
    id: 'analytics-cookies',
    number: '02',
    title: 'Analytics, performance data and cookies',
    paragraphs: [
      'When you visit, analytics and performance providers may handle limited technical and usage information. We use it to understand traffic, maintain the site, find slow pages and improve calculators and guides. We do not use calculator analytics to determine your tax, build a financial profile, or show personalised advertising.',
      'Vercel Web Analytics is cookie-free. Google Analytics may set first-party analytics cookies. Google states that its default _ga cookies can remain for up to two years, although browser settings and provider configuration can shorten that period.',
    ],
    providers: PRIVACY_PROVIDERS,
    icon: BarChart3,
  },
  {
    id: 'hosting-security',
    number: '03',
    title: 'Hosting and security logs',
    paragraphs: [
      'Like most websites, our hosting and delivery providers may automatically process request information needed to serve and protect the site. This can include an IP address, request time, requested page, browser details and security signals.',
      'We use this information only for website delivery, reliability, abuse prevention and security. It is handled under the relevant provider’s terms and retention practices.',
    ],
    icon: Server,
  },
  {
    id: 'contact-data',
    number: '04',
    title: 'Information you send us',
    paragraphs: [
      'If you email us, we receive the email address, name and message details you choose to provide. We use them to answer your request, keep necessary correspondence and protect against misuse.',
      'Please do not include a CNIC, tax return, account credentials, or detailed financial records in an email. We do not need them to answer a general question about the site.',
    ],
    icon: Mail,
  },
  {
    id: 'sharing',
    number: '05',
    title: 'When information is shared',
    paragraphs: [
      'We do not sell or rent personal information. We may allow service providers such as Vercel and Google to process limited information for hosting, security, analytics and performance measurement.',
      'We may also disclose information if reasonably necessary to comply with law, respond to lawful process, protect the site or users, or investigate misuse. Providers may process information outside Pakistan under their own privacy terms.',
    ],
    icon: UsersRound,
  },
  {
    id: 'retention',
    number: '06',
    title: 'How long information is kept',
    paragraphs: [
      'We do not retain calculator monetary amounts or results because we do not receive them. Analytics data and technical logs are kept according to our configured provider settings and the provider’s applicable retention practices.',
      'Email correspondence is kept only for as long as reasonably needed to answer the request, maintain necessary records, or meet legal and security obligations.',
    ],
    icon: FileClock,
  },
  {
    id: 'choices',
    number: '07',
    title: 'Your choices and requests',
    paragraphs: [
      'You can block or delete cookies through your browser, use a content blocker, and opt out of Google Analytics with Google’s browser add-on. Blocking analytics should not stop the calculators from working.',
      'You may email us to ask about information connected with your correspondence or to request access, correction or deletion where applicable. Because there are no accounts and calculator amounts are not received, we usually cannot connect a calculation with a particular visitor.',
    ],
    bullets: [
      { label: 'Browser controls: clear or block first-party analytics cookies.' },
      {
        label: 'Install the Google Analytics opt-out browser add-on.',
        href: 'https://tools.google.com/dlpage/gaoptout',
      },
      {
        label: `Email ${CONTACT_EMAIL} with a privacy request.`,
        href: CONTACT_MAILTO,
      },
    ],
    icon: Settings2,
  },
  {
    id: 'external-links',
    number: '08',
    title: 'External links and embedded use',
    paragraphs: [
      'Our guides and source cards link to government websites such as FBR and IRIS. Once you open another website, its privacy practices apply. We are not responsible for how an external site handles information.',
      'The embeddable salary calculator is part of My Tax Calculator and is covered by this policy. The publisher of a page that embeds it may collect information separately under its own policy.',
      'When the calculator is displayed inside another website, we record the domain name of that website—for example “example.com”—so we can see where the calculator is being used and keep it working there. This identifies the publisher’s website, not you. It does not include the specific page you were reading, and the amounts you enter into the embedded calculator are still processed only in your browser.',
    ],
    icon: ExternalLink,
  },
  {
    id: 'children-security',
    number: '09',
    title: 'Children and data security',
    paragraphs: [
      'The site is a general tax-information service and is not directed to children. We do not knowingly ask children to provide personal information.',
      'We use HTTPS and reputable service providers to protect information in transit and operate the site safely. No internet service can promise absolute security, so avoid sending sensitive records by email.',
    ],
    icon: LockKeyhole,
  },
  {
    id: 'policy-updates',
    number: '10',
    title: 'Changes to this policy',
    paragraphs: [
      'We may update this policy when the site, its providers or applicable requirements change. The revised policy will appear on this page with a new “Last updated” date.',
    ],
    icon: RefreshCw,
  },
];

export const PRIVACY_CONTACT_COPY = {
  eyebrow: 'Questions or requests',
  title: 'Talk to us about privacy.',
  description:
    'If something here is unclear, or you want to make a privacy request, email us. Please do not send detailed financial records or identity documents.',
  email: CONTACT_EMAIL,
  buttonLabel: 'Email privacy team',
  note: 'My Tax Calculator is an independent service and is not operated by FBR or the Government of Pakistan.',
} as const;
