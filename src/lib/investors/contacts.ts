/**
 * Company facts and named contacts for /investors.
 *
 * Transcribed by hand from https://www.jetking.com/investors (2026-09-21). They change
 * rarely and are compliance-sensitive — a wrong contact on a SEBI disclosure page is worse
 * than a stale one — so they are typed and reviewed here rather than scraped. The document
 * lists, which change every quarter, are synced instead (`npm run sync:investors`).
 */

export const COMPANY = {
  registeredOffice:
    '5th Floor, Amore Building, Junction of 2nd & 4th Road, Khar, Mumbai – 400052, Maharashtra, India',
  phone: '07666830000',
  email: 'investors@jetking.com',
  listedAt: 'BSE Limited (BSE)',
  scripCode: '517063',
  tradingSymbol: 'JETKINGQ',
} as const;

export const GRIEVANCE_OFFICER = {
  name: 'Ms. Anita Jaiswal',
  phone: '+91 9820009165',
  email: 'investors@jetking.com',
} as const;

export const REGISTRAR = {
  name: 'MUFG Intime India Private Limited',
  address: 'C 101, 247 Park, L.B.S. Marg, Vikhroli (West), Mumbai – 400083',
  phone: '+91 810 811 6767',
  fax: '022 - 4918 6060',
  email: 'rnt.helpdesk@in.mpms.mufg.com',
  website: 'https://in.mpms.mufg.com/',
} as const;

/** Key Managerial Personnel authorised to determine the materiality of an event or information. */
export const KMP = [
  { name: 'Harsh Suresh Bharwani', designation: 'Managing Director and CEO' },
  { name: 'Siddarth Suresh Bharwani', designation: 'Joint Managing Director and CFO' },
  { name: 'Avinash Bharwani Suresh', designation: 'Whole Time Director' },
  { name: 'Anita Jaiswal', designation: 'Company Secretary and Compliance Officer' },
] as const;

/** All four KMP share the company's investor line and mailbox. */
export const KMP_CONTACT = { phone: COMPANY.phone, email: COMPANY.email } as const;
