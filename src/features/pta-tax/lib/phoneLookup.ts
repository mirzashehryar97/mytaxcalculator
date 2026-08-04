import type { SelectOption } from '@/components/calculator/select';

import { PTA_FORM_COPY } from '@/features/pta-tax/lib/content';
import {
  PTA_NEW_PHONES,
  PTA_PHONE_BRANDS,
  PTA_USED_PHONES,
} from '@/features/pta-tax/lib/phoneCatalogue';
import type { PtaPhone } from '@/features/pta-tax/types';

export const PTA_BRAND_OPTIONS: readonly SelectOption<string>[] = PTA_PHONE_BRANDS.map((brand) => ({
  value: brand,
  label: brand,
}));

/** Distinct model families a brand has, in the order the ruling lists them. */
export function getModelOptions(brand: string): SelectOption<string>[] {
  const seen = new Set<string>();
  const options: SelectOption<string>[] = [];

  for (const phone of PTA_NEW_PHONES) {
    if (phone.brand === brand && !seen.has(phone.model)) {
      seen.add(phone.model);
      options.push({ value: phone.model, label: phone.model });
    }
  }

  return options;
}

/**
 * Storage tiers a model is priced at. Empty where the ruling prices the model
 * at one configuration it never names — the form then drops the field entirely
 * rather than showing a dropdown with a single meaningless entry.
 *
 * Four models are priced at both: an unqualified row and one or more configured
 * rows, at different serials and different values (Honor 90 at 290 and 370,
 * Xiaomi Redmi 9C, Xiaomi Poco M3, Huawei Y7 Prime 2019). Filtering the blank
 * row out would leave its value unreachable and quote every base handset at the
 * configured price, so it stays in the list under `variantUnstatedLabel` — in
 * ruling order, which puts it first and makes it the default.
 */
export function getVariantOptions(brand: string, model: string): SelectOption<string>[] {
  const rows = PTA_NEW_PHONES.filter((phone) => phone.brand === brand && phone.model === model);

  if (rows.every((phone) => phone.variant === '')) {
    return [];
  }

  return rows.map((phone) => ({
    value: phone.variant,
    label: phone.variant === '' ? PTA_FORM_COPY.variantUnstatedLabel : phone.variant,
  }));
}

export function findPhone(brand: string, model: string, variant: string): PtaPhone | null {
  return (
    PTA_NEW_PHONES.find(
      (phone) => phone.brand === brand && phone.model === model && phone.variant === variant,
    ) ?? null
  );
}

/**
 * The old/used value VR 2070/2026 puts on the same handset, matched on model
 * name alone because that ruling prices no storage tiers. Shown only as
 * context: its scope is commercial-quantity imports, not one traveller's phone.
 */
export function findUsedPhone(brand: string, model: string): PtaPhone | null {
  const wanted = normaliseForMatch(`${brand} ${model}`);

  return (
    PTA_USED_PHONES.find(
      (phone) => normaliseForMatch(`${phone.brand} ${phone.model}`) === wanted,
    ) ?? null
  );
}

/**
 * VR 2070 spells brands into the model ("SAMSUNG GALAXY S23") where VR 1834
 * does not, so the two tables only line up once case, spacing and a repeated
 * brand word are taken out. A trailing "5G" goes too — the two rulings disagree
 * on whether to write it, and it names the radio rather than a separate model.
 *
 * The two also disagree on how to write the larger variant: VR 2070 has
 * "GALAXY S22+ 5G" where VR 1834 has "Galaxy S22 Plus", so "+" is folded to the
 * word before anything else runs. Without it the five plus-sized Samsungs in
 * the used table never matched their new-phone counterparts and the used-value
 * note silently stayed hidden for them.
 *
 * Nothing else is stripped: "S23+" and "S23" are different phones at different
 * values, and folding to "s23 plus" keeps them apart just as "+" did.
 */
const PLUS_SIGN = /\+/g;
const NON_MATCH_CHARS = /[^a-z0-9]+/g;
const TRAILING_5G = / 5g$/;

function normaliseForMatch(value: string): string {
  return value
    .toLowerCase()
    .replace(PLUS_SIGN, ' plus')
    .replace(NON_MATCH_CHARS, ' ')
    .trim()
    .split(' ')
    .filter((word, index, words) => index === 0 || word !== words[index - 1])
    .join(' ')
    .replace(TRAILING_5G, '');
}

/** First model of a brand, so changing brand never leaves a stale selection. */
export function getFirstModel(brand: string): string {
  return getModelOptions(brand)[0]?.value ?? '';
}

/** First storage tier of a model, or `''` when the model has no tiers. */
export function getFirstVariant(brand: string, model: string): string {
  return getVariantOptions(brand, model)[0]?.value ?? '';
}
