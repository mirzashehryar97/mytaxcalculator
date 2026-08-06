/**
 * The site's public contact addresses.
 *
 * Only these two are ever published. The remaining mailbox aliases stay private
 * on purpose:
 *
 * - `info@`  — already published on the live legal pages, so it must keep
 *              forwarding, but nothing new should point at it.
 * - `hello@` — a duplicate of `contact@`; a second general address only splits
 *              the same conversation across two inboxes.
 * - `admin@` — registrar, DNS, Search Console, analytics and DMARC reports.
 *              Publishing an infrastructure address invites credential phishing.
 * - `noreply@` — a `From:` header for automated mail. The site is stateless and
 *              sends none today, so it has no use yet.
 */

/** General enquiries — the address a visitor guesses, and the only one in the chrome. */
export const CONTACT_EMAIL = 'contact@mytaxcalculator.pk';

/** Rate corrections and publisher/embed help — anything needing an action, not an explanation. */
export const SUPPORT_EMAIL = 'support@mytaxcalculator.pk';

export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}` as const;
export const SUPPORT_MAILTO = `mailto:${SUPPORT_EMAIL}` as const;
