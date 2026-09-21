/**
 * Pulls the document lists for /investors from https://www.jetking.com/investors,
 * which stays the source of truth (it is where the company's compliance team
 * uploads filings). Writes src/lib/investors/disclosures.json.
 *
 * Run with: npm run sync:investors
 *
 * The live page is a page-builder document: each disclosure is a section headline
 * followed by a bullet list of links. This walks it in document order, keeps only rows
 * that actually link somewhere, and maps the source headings onto the accordion order
 * the site uses (modelled on NIIT's Regulation 46 disclosures page).
 *
 * Contacts (grievance officer, share agent, KMP) and the company facts change rarely and
 * are typed by hand in src/lib/investors/contacts.ts, not scraped.
 */
import { load } from 'cheerio';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SOURCE_URL = 'https://www.jetking.com/investors';
const OUT = path.join(process.cwd(), 'src', 'lib', 'investors', 'disclosures.json');

/** Display order. `from` lists the source headline(s) merged into one accordion, in the order shown. */
const SECTIONS = [
  { id: 'board-of-directors', title: 'Board of Directors', from: ['Composition of the Committees of the Board'] },
  { id: 'appointment-independent-directors', title: 'Appointment Letter of Independent Directors', from: ['Appointment Letter of Independent Directors'] },
  { id: 'code-of-conduct-policies', title: 'Code of Conduct & Policies', from: ['Code of Conduct', 'Policies'] },
  { id: 'shareholding-pattern', title: 'Shareholding Pattern', from: ['Shareholding Pattern'] },
  { id: 'press-releases', title: 'Press Releases & Newspaper Publications', from: ['Press Release'] },
  { id: 'notices', title: 'Notices & Announcements', from: ['Notices'] },
  { id: 'material-events', title: 'Material Events', from: ['Material Events'] },
  { id: 'financial-results', title: 'Financial Results', from: ['Financial Results'] },
  { id: 'annual-reports', title: 'Annual Reports', from: ['Annual Reports'] },
  { id: 'annual-returns', title: 'Annual Returns (MGT-7)', from: ['Annual Returns'] },
  { id: 'subsidiary-financials', title: 'Subsidiary Financials', from: ['Subsidiary Financial'] },
  { id: 'secretarial-compliance', title: 'Annual Secretarial Compliance Report', from: ['Annual Secretarial Compliance Report'] },
  { id: 'corporate-governance-reports', title: 'Corporate Governance Reports', from: ['Corporate Governance Reports'] },
  { id: 'related-party', title: 'Related Party Disclosure', from: ['Related Party Disclosure'] },
  { id: 'agm-voting-results', title: 'AGM Voting Results', from: ['AGM'] },
  { id: 'voting-results', title: 'Voting Results', from: ['Results'] },
  { id: 'familiarisation', title: 'Familiarisation Programme', from: ['Familiarisation Programme'] },
  { id: 'investor-updates', title: 'Investor Updates', from: ['Investor Updates'] },
  { id: 'unclaimed-dividends', title: 'Unpaid / Unclaimed Dividends and Shares', from: ['Unpaid / Unclaimed Dividends and Shares'] },
  { id: 'company-documents', title: 'Company Documents', from: ['Company Documents'] },
];

const clean = (text) => text.replace(/​/g, '').replace(/\s+/g, ' ').trim();
/** Labels come from a WYSIWYG editor: strip trailing full stops and stray spaces around dashes. */
const tidyLabel = (text) => clean(text).replace(/\.$/, '');

async function main() {
  const res = await fetch(SOURCE_URL, { headers: { 'user-agent': 'Mozilla/5.0 (jetking-platform sync)' } });
  if (!res.ok) throw new Error(`${SOURCE_URL} returned ${res.status}`);
  const $ = load(await res.text());
  $('script,style,noscript,svg').remove();

  const bySource = new Map(); // source headline -> [{label, href}]
  const links = {};
  let current = null;

  $('[data-page-element]').each((_, el) => {
    const type = $(el).attr('data-page-element');

    if (type === 'Headline/V1') {
      const title = clean($(el).text());
      if (title && $(el).find('h1').length) {
        current = title;
        if (!bySource.has(title)) bySource.set(title, []);
      }
      return;
    }

    // "Click Here" buttons directly under a headline (Stock Live, Latest News, Board of Directors).
    if (type === 'Button/V1' && current) {
      const href = $(el).find('a[href]').first().attr('href');
      if (href && href !== '#') {
        if (/^stock live/i.test(current)) links.stockLive = href;
        if (/^latest news/i.test(current)) links.latestNews = href;
        if (/^board of directors/i.test(current)) links.boardOfDirectors = href;
      }
      return;
    }

    if (type === 'BulletList/V1' && current) {
      $(el)
        .find('li')
        .each((__, li) => {
          const anchor = $(li).find('a[href]').filter((i, a) => clean($(a).text())).first();
          const href = anchor.attr('href');
          const label = tidyLabel(anchor.text() || $(li).text());
          // Rows without a link are footer text the page builder left in the list.
          if (href && href !== '#' && label) bySource.get(current).push({ label, href });
        });
    }
  });

  const sections = SECTIONS.map((section) => {
    const items = section.from.flatMap((source) => {
      const found = bySource.get(source);
      if (!found) console.warn(`  ! source section not found: "${source}"`);
      return found ?? [];
    });
    return { id: section.id, title: section.title, items };
  });

  // The "Board of Directors" accordion leads with the dedicated board page, then the committees document.
  if (links.boardOfDirectors) {
    const board = sections.find((s) => s.id === 'board-of-directors');
    board.items.unshift({ label: 'Board of Directors', href: links.boardOfDirectors });
  }

  const empty = sections.filter((s) => s.items.length === 0).map((s) => s.title);
  if (empty.length) console.warn(`  ! empty sections: ${empty.join(', ')}`);

  const output = { source: SOURCE_URL, syncedAt: new Date().toISOString().slice(0, 10), links, sections };
  await mkdir(path.dirname(OUT), { recursive: true });
  await writeFile(OUT, `${JSON.stringify(output, null, 2)}\n`, 'utf8');

  const total = sections.reduce((n, s) => n + s.items.length, 0);
  console.log(`Wrote ${path.relative(process.cwd(), OUT)}: ${sections.length} sections, ${total} documents.`);
  for (const s of sections) console.log(`  ${String(s.items.length).padStart(3)}  ${s.title}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
