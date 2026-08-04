import type { PtaDeviceKind, PtaPhone } from '@/features/pta-tax/types';

/**
 * The valuation ruling does not state a device class, so this is a separate,
 * researched taxonomy rather than part of the price transcription.
 *
 * Classification follows Chapter 85, Note 5 of the Pakistan Customs Tariff:
 * a smartphone has a mobile operating system designed for ADP-like functions,
 * including downloadable third-party applications and multitasking. The list
 * below is the complete set this researched implementation taxonomy assigns to
 * the basic/other class. Every unlisted model in this fixed catalogue version
 * is assigned to the smartphone complement, and the complete mapping is
 * fingerprinted below so a future catalogue edit cannot inherit that tag.
 *
 * Four Nokia KaiOS models (8110 DS, 2720, 6300 4G DS and 8000 4G DS) are
 * deliberately not here. Although HMD markets them as feature phones, KaiOS
 * installs third-party applications and supports background application
 * processes. Trade records conflict between 8517.13 and 8517.14, so smartphone
 * is a reasoned application of the legal capability test, not a claim of
 * settled model-specific Customs practice.
 *
 * Sea Shark S112/S700 and the five X Tell models are the lowest-confidence
 * basic assignments. An official EDB list identifies both brands as 2G and a
 * trade record supports S700 under 8517.14, but exact-model evidence does not
 * survive for the other six. The UI therefore tells visitors to follow the
 * class on their own Customs assessment where it differs.
 *
 * Research record and source URLs: calculator-docs/pta-mobile-registration-tax.md.
 */
const BASIC_PHONE_MODELS_BY_BRAND = {
  Samsung: ['SM-B310E', 'GT-E1200R/E1200', 'GT-E1205'],
  Nokia: [
    '105 - 2022',
    '1280',
    '105 4G',
    '125',
    'X1-01',
    '6310',
    '101',
    '220',
    '225',
    'C1-02',
    '107',
    '215 4G',
    '206',
    '100',
    '110 4G',
    '1616',
    '103',
    '1600',
    '1800',
    '112',
    'X2-05',
    'X2-02 (2011)',
    'X2-01',
    'X2-00',
    '1110',
    'C2-01',
    '1209',
    '1202',
    '1100',
    'C3-00',
    '301',
    '1112',
    'C2-00',
    '6090',
    '200',
    '1650',
    '5130',
    '6230',
    '202',
    '6303',
    '2700',
    '515',
    'C2-03',
    '130 DS',
    '105 SS',
    '105 DS',
    '108 DS',
    '215 DS',
    '222 DS',
    '150 DS',
    '216 DS',
    '230 DS',
    '3310 DS',
    '3310 3G',
    '106 DS',
    '210 DS',
    '110 DS',
    '150 DS 2020',
    '5310 DS',
    '225 4G DS',
  ],
  itel: [
    'Value 400',
    'itel-Power 400',
    'Muzik 410',
    'itel-Value 110',
    'Muzik 110',
    'itel-IT5092',
    'Value-100',
    'Power 700',
    'Magic 2',
    'Magic 2 Max',
    'Muzik 400 Core',
    'Power 410',
    'IT5026',
    'IT2192T',
  ],
  'Sea Shark': ['S112', 'S700'],
  'X Tell': ['X2 King', 'X4 King', 'Music ka badshah', 'Big Power', 'Big Boss'],
} as const satisfies Readonly<Record<string, readonly string[]>>;

function toPhoneKey(brand: string, model: string): string {
  return `${brand}\u0000${model}`;
}

const BASIC_PHONE_KEYS = new Set(
  Object.entries(BASIC_PHONE_MODELS_BY_BRAND).flatMap(([brand, models]) =>
    models.map((model) => toPhoneKey(brand, model)),
  ),
);

/** Number of distinct model families in the fixed, classified catalogue snapshot. */
const CLASSIFIED_MODEL_COUNT = 870;
/** Stable hash of every sorted `brand\0model\0deviceKind` assignment. */
const CLASSIFICATION_HASH = 926_472_390;

function hashClassificationKeys(keys: ReadonlySet<string>): number {
  let hash = 7;

  for (const character of [...keys].sort().join('\n')) {
    hash = (hash * 31 + character.charCodeAt(0)) % 1_000_000_007;
  }

  return hash;
}

export function classifyPtaPhone(brand: string, model: string): PtaDeviceKind {
  return BASIC_PHONE_KEYS.has(toPhoneKey(brand, model)) ? 'feature-phone' : 'smartphone';
}

/**
 * Makes a catalogue update fail loudly until its taxonomy is re-audited. It
 * also catches a typo in the curated basic-phone list, which would otherwise
 * silently expose that handset under the smartphone filter.
 */
export function assertPtaPhoneClassificationCoverage(phones: readonly PtaPhone[]): void {
  const catalogueKeys = new Set(phones.map((phone) => toPhoneKey(phone.brand, phone.model)));
  const classificationKeys = new Set(
    phones.map((phone) => `${toPhoneKey(phone.brand, phone.model)}\u0000${phone.deviceKind}`),
  );
  const missingBasicModels = [...BASIC_PHONE_KEYS].filter((key) => !catalogueKeys.has(key));
  const basicModelCount = new Set(
    phones
      .filter((phone) => phone.deviceKind === 'feature-phone')
      .map((phone) => toPhoneKey(phone.brand, phone.model)),
  ).size;

  if (
    catalogueKeys.size !== CLASSIFIED_MODEL_COUNT ||
    classificationKeys.size !== CLASSIFIED_MODEL_COUNT ||
    hashClassificationKeys(classificationKeys) !== CLASSIFICATION_HASH ||
    basicModelCount !== BASIC_PHONE_KEYS.size ||
    missingBasicModels.length > 0
  ) {
    throw new Error('The PTA phone catalogue changed without a complete device-type audit.');
  }
}
