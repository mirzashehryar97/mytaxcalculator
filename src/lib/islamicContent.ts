/**
 * Verified Islamic texts rendered on the site.
 *
 * Every entry keeps the Arabic, a short non-interpretive English rendering and
 * an explicit citation. The wording below was checked against a primary source
 * before publishing — do not edit the Arabic, the translation or the reference
 * without re-checking it against the source named in the comment above it.
 */
export interface IslamicText {
  /** Fully vowelled Arabic, rendered RTL in Amiri. */
  arabic: string;
  /** Short English rendering, kept close to the standard translation. */
  translation: string;
  /** Citation shown alongside the text. */
  citation: string;
}

/**
 * Surah Ibrahim 14:7. Arabic verified against the Uthmani text of the ayah
 * (`وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ ...`); the English is the
 * Saheeh International rendering with its bracketed clarifier "[in favor]"
 * dropped to keep the ribbon to one line.
 */
export const GRATITUDE_VERSE: IslamicText = {
  arabic: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
  translation: 'If you are grateful, I will surely increase you.',
  citation: 'QURAN 14:7',
};

/**
 * Sahih Muslim 2588 (Book 45, Hadith 90), narrated by Abu Hurairah. The full
 * report continues `وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوٍ إِلَّا عِزًّا ...`; only the opening
 * clause is quoted here.
 */
export const CHARITY_HADITH: IslamicText = {
  arabic: 'مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ',
  translation: 'Charity does not decrease wealth.',
  citation: 'Sahih Muslim 2588',
};

/** Decorative Arabic ح that marks the closing hadith strip. Not read out. */
export const HADITH_MARK = 'ح';

/**
 * Line printed beside the gratitude verse in a result card, naming what the
 * taxpayer actually keeps. It anchors the verse to the number on screen rather
 * than leaving it as decoration.
 */
export function takeHomeShukrNote(monthlyTakeHome: number) {
  return `Rs. ${monthlyTakeHome.toLocaleString('en-PK')} reaches you this month.`;
}
