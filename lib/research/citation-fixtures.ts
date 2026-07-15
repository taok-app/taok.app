import type {
  CitationStreamEvent,
  ResearchCitation,
  ResearchSource,
} from '@/types/citations'

/**
 * Deterministic sample data for the Citation & Sources trust layer. Used by the
 * demo workspace and by tests. Timestamps are fixed so snapshots stay stable.
 */

const DAY = '2026-07-16'
function at(time: string): string {
  return `${DAY}T${time}:00.000Z`
}

export const SAMPLE_SOURCES: ResearchSource[] = [
  {
    id: 'src-crunchbase',
    type: 'company_database',
    provider: 'Crunchbase',
    title: 'Northwind AI — Funding Rounds & Investors',
    url: 'https://www.crunchbase.com/organization/northwind-ai',
    domain: 'crunchbase.com',
    publishedAt: '2026-06-30',
    collectedAt: at('10:20'),
    snippet:
      'Northwind AI closed a $48M Series B led by Meridian Ventures, with participation from existing investors. Post-money valuation reported at $320M.',
    trustScore: 96,
    verification: 'verified',
    timeline: [
      { id: 'cb-1', phase: 'discovered', label: 'Source discovered', at: at('10:20') },
      { id: 'cb-2', phase: 'extracted', label: 'Content extracted', at: at('10:21') },
      { id: 'cb-3', phase: 'verified', label: 'Verified against filing', at: at('10:22'), detail: 'Cross-checked with SEC Form D.' },
    ],
  },
  {
    id: 'src-techcrunch',
    type: 'news',
    provider: 'TechCrunch',
    title: 'Northwind AI raises $48M to scale its research agents',
    url: 'https://techcrunch.com/2026/06/northwind-ai-series-b',
    domain: 'techcrunch.com',
    publishedAt: '2026-06-30',
    collectedAt: at('10:20'),
    snippet:
      'The round was led by Meridian Ventures. CEO Dana Lin said the capital will fund expansion of the company\u2019s enterprise research platform.',
    trustScore: 84,
    verification: 'cross_checked',
    timeline: [
      { id: 'tc-1', phase: 'discovered', label: 'Source discovered', at: at('10:20') },
      { id: 'tc-2', phase: 'extracted', label: 'Content extracted', at: at('10:21') },
    ],
  },
  {
    id: 'src-github',
    type: 'github',
    provider: 'GitHub',
    title: 'northwind-ai/agent-runtime — public repository',
    url: 'https://github.com/northwind-ai/agent-runtime',
    domain: 'github.com',
    publishedAt: '2026-07-10',
    collectedAt: at('10:23'),
    snippet:
      'Open-source runtime with 4.2k stars. Commit velocity increased 3x in the last quarter, indicating active engineering investment.',
    trustScore: 72,
    verification: 'single_source',
    timeline: [
      { id: 'gh-1', phase: 'discovered', label: 'Source discovered', at: at('10:23') },
      { id: 'gh-2', phase: 'processed', label: 'Metrics processed', at: at('10:24') },
    ],
  },
  {
    id: 'src-blog',
    type: 'web_article',
    provider: 'Company Blog',
    title: 'Scaling Northwind: our next chapter',
    url: 'https://northwind.ai/blog/next-chapter',
    domain: 'northwind.ai',
    publishedAt: '2026-07-01',
    collectedAt: at('10:23'),
    snippet:
      'We plan to grow the team to 120 people and open a New York office. Headcount figures here are self-reported and unverified.',
    trustScore: 47,
    verification: 'unverified',
    timeline: [
      { id: 'bl-1', phase: 'discovered', label: 'Source discovered', at: at('10:23') },
    ],
  },
  {
    id: 'src-analyst',
    type: 'research_paper',
    provider: 'Meridian Research',
    title: 'Enterprise AI Agents: Market Sizing 2026',
    url: 'https://meridian.example/reports/ai-agents-2026',
    domain: 'meridian.example',
    publishedAt: '2026-05-15',
    collectedAt: at('10:25'),
    snippet:
      'The report estimates the enterprise research-agent market at $6.1B in 2026, growing 34% YoY. Northwind is named a challenger.',
    trustScore: 68,
    verification: 'conflicting',
    timeline: [
      { id: 'an-1', phase: 'discovered', label: 'Source discovered', at: at('10:25') },
      { id: 'an-2', phase: 'conflict', label: 'Conflict detected', at: at('10:26'), detail: 'Market size disagrees with a second analyst estimate ($4.4B).' },
    ],
  },
]

export const SAMPLE_CITATIONS: ResearchCitation[] = [
  {
    id: 'cit-1',
    reference: 1,
    sourceId: 'src-crunchbase',
    claim: 'Northwind AI raised a $48M Series B led by Meridian Ventures.',
    evidence:
      'Northwind AI closed a $48M Series B led by Meridian Ventures, with participation from existing investors.',
    interpretation:
      'The funding amount and lead investor are stated directly by a primary financial database and corroborated by a filing.',
    confidenceReasoning:
      'Reported by a high-trust database (Crunchbase) and cross-checked against an SEC Form D, yielding very high confidence.',
    confidence: 96,
    verification: 'verified',
    createdAt: at('10:22'),
    relatedCitationIds: ['cit-2'],
  },
  {
    id: 'cit-2',
    reference: 2,
    sourceId: 'src-techcrunch',
    claim: 'The capital will fund expansion of Northwind\u2019s enterprise research platform.',
    evidence:
      'CEO Dana Lin said the capital will fund expansion of the company\u2019s enterprise research platform.',
    interpretation:
      'A direct executive quote in a reputable outlet, corroborated by the company blog\u2019s stated growth plans.',
    confidenceReasoning:
      'Single reputable outlet corroborated by one other source; confidence is high but not verified against a primary filing.',
    confidence: 84,
    verification: 'cross_checked',
    createdAt: at('10:22'),
    relatedCitationIds: ['cit-1'],
  },
  {
    id: 'cit-3',
    reference: 3,
    sourceId: 'src-github',
    claim: 'Engineering activity has accelerated, with commit velocity up roughly 3x last quarter.',
    evidence: 'Commit velocity increased 3x in the last quarter, indicating active engineering investment.',
    interpretation:
      'A useful signal of momentum, but drawn from a single public repository that may not represent all engineering work.',
    confidenceReasoning:
      'Derived from one public data source without corroboration; treat as a directional signal.',
    confidence: 72,
    verification: 'single_source',
    createdAt: at('10:24'),
  },
  {
    id: 'cit-4',
    reference: 4,
    sourceId: 'src-blog',
    claim: 'The company plans to grow headcount to about 120 people.',
    evidence: 'We plan to grow the team to 120 people and open a New York office.',
    interpretation: 'Self-reported forward-looking guidance from the company blog; not independently verified.',
    confidenceReasoning: 'Self-reported and unverified; low confidence until corroborated by hiring data.',
    confidence: 47,
    verification: 'unverified',
    createdAt: at('10:23'),
  },
  {
    id: 'cit-5',
    reference: 5,
    sourceId: 'src-analyst',
    claim: 'The enterprise research-agent market is estimated at roughly $6.1B in 2026.',
    evidence: 'The report estimates the enterprise research-agent market at $6.1B in 2026, growing 34% YoY.',
    interpretation:
      'One analyst estimate; a competing estimate places the market notably lower, so the figure is contested.',
    confidenceReasoning:
      'Sources conflict on market size ($6.1B vs $4.4B); flagged for manual review.',
    confidence: 58,
    verification: 'conflicting',
    createdAt: at('10:26'),
    relatedCitationIds: ['cit-3'],
  },
]

/**
 * An ordered event stream that interleaves source discovery, citation creation,
 * and later verification — mirroring how these arrive during live research.
 */
export const SAMPLE_STREAM_EVENTS: CitationStreamEvent[] = [
  { type: 'source_found', source: SAMPLE_SOURCES[0] },
  { type: 'citation_added', citation: { ...SAMPLE_CITATIONS[0], verification: 'single_source', confidence: 70 } },
  { type: 'source_found', source: SAMPLE_SOURCES[1] },
  { type: 'citation_added', citation: SAMPLE_CITATIONS[1] },
  { type: 'source_found', source: SAMPLE_SOURCES[2] },
  { type: 'citation_added', citation: SAMPLE_CITATIONS[2] },
  { type: 'source_found', source: SAMPLE_SOURCES[3] },
  { type: 'citation_added', citation: SAMPLE_CITATIONS[3] },
  { type: 'source_found', source: SAMPLE_SOURCES[4] },
  { type: 'citation_added', citation: SAMPLE_CITATIONS[4] },
  // Verification arrives after the fact for the first citation.
  {
    type: 'verification_completed',
    citationId: 'cit-1',
    verification: 'verified',
    confidence: 96,
    reasoning:
      'Reported by a high-trust database (Crunchbase) and cross-checked against an SEC Form D, yielding very high confidence.',
  },
]
