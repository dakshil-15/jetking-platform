import type { HomeData } from '../data';
import type { EnquiryCentre } from '@/components/EnquiryModal';
import { TrustStats } from './TrustStats';
import { ProgramShowcase } from './ProgramShowcase';
import { CareerPaths } from './CareerPaths';
import { WhyJetking } from './WhyJetking';
import { Recognitions } from './Recognitions';
import { CentreNetwork } from './CentreNetwork';
import { CredibilityMarquee } from './CredibilityMarquee';
import { PlacementProof } from './PlacementProof';
import { HowItWorks } from './HowItWorks';
import { BlogTeaser } from './BlogTeaser';
import { FranchiseBand } from './FranchiseBand';
import { FinalCta } from './FinalCta';

/**
 * Everything the homepage shows below `HomeV2`'s hero, in competitor-informed order:
 * trust figures → logos → programmes → career paths → placements → recognition →
 * centre map → why Jetking → how it works → blog → franchise → final lead form
 * (proof first, explanation later), ending in the site's normal footer (see `FooterChrome`).
 *
 * `.dark-canvas.no-orbs` opts into the same shared token/card system the rest of the
 * site uses — `.no-orbs` because the glow-orb decoration reads as a hero flourish.
 *
 * No right-hand gutter is reserved for `ActionRail`: it is contained to the hero's own
 * box (see the wrapper around `HomeV2` in `page.tsx`).
 */
export function HomeSections({
  data,
  enquiryCentres,
}: {
  data: HomeData;
  enquiryCentres: EnquiryCentre[];
}) {
  return (
    <div className="dark-canvas no-orbs">
      <TrustStats counts={data.counts} trust={data.trust} />
      <CredibilityMarquee />
      <ProgramShowcase courses={data.courses} />
      <CareerPaths />
      <PlacementProof />
      <Recognitions />
      <CentreNetwork cities={data.cities} centres={data.centres} counts={data.counts} />
      <WhyJetking />
      <HowItWorks />
      <BlogTeaser posts={data.posts} />
      <FranchiseBand />
      <FinalCta centres={enquiryCentres} />
    </div>
  );
}
