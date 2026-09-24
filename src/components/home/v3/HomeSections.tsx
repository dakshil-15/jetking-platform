import type { HomeData } from '../data';
import type { EnquiryCentre } from '@/components/EnquiryModal';
import { ProgramShowcase } from './ProgramShowcase';
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
 * Everything below the hero, in the order of the approved design: partner logos ->
 * programmes -> career steps -> placements -> recognition -> centre map -> why Jetking ->
 * blog -> franchise -> lead form, ending in the site's normal footer (see `FooterChrome`).
 * Backgrounds alternate white / grey section by section.
 *
 * `.dark-canvas.no-orbs` opts into the shared token/card system the rest of the site uses.
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
      <CredibilityMarquee />
      <ProgramShowcase courses={data.courses} />
      <HowItWorks />
      <PlacementProof />
      <Recognitions />
      <CentreNetwork cities={data.cities} centres={data.centres} counts={data.counts} />
      <WhyJetking />
      <BlogTeaser posts={data.posts} />
      <FranchiseBand />
      <FinalCta centres={enquiryCentres} />
    </div>
  );
}
