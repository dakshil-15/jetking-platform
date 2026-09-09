import type { TrustSignal } from '../types';

/**
 * Public claims about Jetking.
 *
 * These four are carried over from Jetking's own Phase 1 proposal deck, so they are
 * client-supplied rather than invented here — but "appeared in a pitch deck" is not
 * the same as "substantiated for publication". They stay `verified: false` until
 * Jetking confirms each one against a named source, and `localSource.listTrustSignals()`
 * filters unverified signals out before they can reach a template.
 *
 * The effect today: the homepage trust band renders nothing. That is the correct
 * failure mode — an empty section is recoverable, an unsubstantiated scale claim on
 * a public education site is not.
 *
 * To publish one: confirm it with Jetking, set `verified: true`, and fill `source`.
 */
export const trustSignals: TrustSignal[] = [
  {
    id: 'legacy',
    value: '80 years',
    label: 'Of IT training in India',
    verified: false,
    source: 'Jetking Phase 1 proposal deck — needs confirmation against founding date',
  },
  {
    id: 'centres',
    value: '100+',
    label: 'Centres nationwide',
    verified: false,
    source: 'Jetking Phase 1 proposal deck — needs confirmation against current centre list',
  },
  {
    id: 'learners',
    value: '12 lakh+',
    label: 'Careers launched',
    verified: false,
    source: 'Jetking Phase 1 proposal deck — needs a documented basis for the count',
  },
  {
    id: 'accreditation',
    value: 'NSDC',
    label: 'Skill India & Red Hat partner',
    verified: false,
    source: 'Jetking Phase 1 proposal deck — needs current partnership status',
  },
];
