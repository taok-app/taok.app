import { db } from '@/lib/db';
import { organizations, projects, companies, people, contacts, researchSessions, sources, citations } from '@/lib/db/schema';

const DEMO_ORG_ID = 'demo_org_001';
const DEMO_ORG_SLUG = 'demo-org';

export async function seedDatabase() {
  try {
    console.log('🌱 Seeding database...');

    // 1. Create organization
    const [org] = await db
      .insert(organizations)
      .values({
        id: DEMO_ORG_ID,
        name: 'Demo Organization',
        slug: DEMO_ORG_SLUG,
        created_at: new Date(),
        updated_at: new Date(),
      })
      .onConflictDoNothing()
      .returning();

    console.log('✓ Organization created:', org?.id || DEMO_ORG_ID);

    const orgId = org?.id || DEMO_ORG_ID;

    // 2. Create projects
    const [project1, project2] = await db
      .insert(projects)
      .values([
        {
          organization_id: orgId,
          name: 'Q3 Enterprise Expansion',
          description: 'Target enterprise accounts in FinTech sector',
          status: 'active',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          organization_id: orgId,
          name: 'Mid-Market Healthcare Initiative',
          description: 'Identify healthcare decision makers',
          status: 'active',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
      .onConflictDoNothing()
      .returning();

    console.log('✓ Projects created');

    // 3. Create companies
    const [comp1, comp2, comp3] = await db
      .insert(companies)
      .values([
        {
          organization_id: orgId,
          legal_name: 'TechVenture Capital Inc.',
          display_name: 'TechVenture Capital',
          domain: 'techventure.io',
          website: 'https://techventure.io',
          linkedin_url: 'https://linkedin.com/company/techventure-capital',
          industry: 'Financial Services',
          description: 'Leading venture capital firm focused on B2B SaaS',
          location: 'San Francisco, CA',
          employee_count: 45,
          revenue_range: '$10M-$50M',
          funding_stage: 'Series D',
          confidence: 95,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          organization_id: orgId,
          legal_name: 'HealthTech Solutions Ltd.',
          display_name: 'HealthTech Solutions',
          domain: 'healthtech-sol.com',
          website: 'https://healthtech-sol.com',
          linkedin_url: 'https://linkedin.com/company/healthtech-solutions',
          industry: 'Healthcare Technology',
          description: 'Healthcare IT platform for hospital networks',
          location: 'Boston, MA',
          employee_count: 120,
          revenue_range: '$50M-$100M',
          funding_stage: 'Series C',
          confidence: 88,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          organization_id: orgId,
          legal_name: 'CloudScale Systems Corporation',
          display_name: 'CloudScale Systems',
          domain: 'cloudscale.io',
          website: 'https://cloudscale.io',
          linkedin_url: 'https://linkedin.com/company/cloudscale-systems',
          industry: 'Cloud Infrastructure',
          description: 'Enterprise cloud infrastructure platform',
          location: 'Seattle, WA',
          employee_count: 200,
          revenue_range: '$100M+',
          funding_stage: 'Profitable',
          confidence: 92,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
      .onConflictDoNothing()
      .returning();

    console.log('✓ Companies created');

    // 4. Create people
    const [person1, person2, person3, person4] = await db
      .insert(people)
      .values([
        {
          organization_id: orgId,
          company_id: comp1?.id || 'company_1',
          first_name: 'Sarah',
          last_name: 'Chen',
          full_name: 'Sarah Chen',
          title: 'Chief Investment Officer',
          seniority: 'c_level',
          department: 'Investment',
          linkedin_url: 'https://linkedin.com/in/sarah-chen-venture',
          email: 'sarah.chen@techventure.io',
          confidence: 98,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          organization_id: orgId,
          company_id: comp1?.id || 'company_1',
          first_name: 'Michael',
          last_name: 'Rodriguez',
          full_name: 'Michael Rodriguez',
          title: 'Partner - Enterprise Software',
          seniority: 'vp',
          department: 'Investment',
          linkedin_url: 'https://linkedin.com/in/mrodriguez-vc',
          email: 'michael@techventure.io',
          confidence: 96,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          organization_id: orgId,
          company_id: comp2?.id || 'company_2',
          first_name: 'Dr. James',
          last_name: 'Morrison',
          full_name: 'Dr. James Morrison',
          title: 'Chief Medical Officer & VP Product',
          seniority: 'c_level',
          department: 'Product',
          linkedin_url: 'https://linkedin.com/in/james-morrison-md',
          email: 'james.morrison@healthtech-sol.com',
          confidence: 94,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          organization_id: orgId,
          company_id: comp3?.id || 'company_3',
          first_name: 'Lisa',
          last_name: 'Park',
          full_name: 'Lisa Park',
          title: 'VP Business Development',
          seniority: 'vp',
          department: 'Sales',
          linkedin_url: 'https://linkedin.com/in/lisa-park-bd',
          email: 'lisa.park@cloudscale.io',
          confidence: 91,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
      .onConflictDoNothing()
      .returning();

    console.log('✓ People created');

    // 5. Create contacts
    const [contact1, contact2] = await db
      .insert(contacts)
      .values([
        {
          organization_id: orgId,
          person_id: person1?.id || 'person_1',
          company_id: comp1?.id || 'company_1',
          status: 'qualified',
          source: 'linkedin',
          notes: 'Strong fit for enterprise software investing. Met at SaaS conference.',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          organization_id: orgId,
          person_id: person3?.id || 'person_3',
          company_id: comp2?.id || 'company_2',
          status: 'engaged',
          source: 'conference',
          notes: 'Interested in partnership opportunities. Scheduled follow-up call.',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
      .onConflictDoNothing()
      .returning();

    console.log('✓ Contacts created');

    // 6. Create sources
    const [source1, source2] = await db
      .insert(sources)
      .values([
        {
          organization_id: orgId,
          provider: 'crunchbase',
          url: 'https://crunchbase.com/organization/techventure-capital',
          title: 'TechVenture Capital - Crunchbase Profile',
          raw_payload: {
            company: 'TechVenture Capital',
            sector: 'FinTech',
            founded: 2015,
            investors: ['Founders Fund', 'Sequoia Capital'],
          },
          checksum: 'hash_source_1',
          fetched_at: new Date(),
          created_at: new Date(),
        },
        {
          organization_id: orgId,
          provider: 'linkedin',
          url: 'https://linkedin.com/company/healthtech-solutions',
          title: 'HealthTech Solutions - LinkedIn Company Profile',
          raw_payload: {
            company: 'HealthTech Solutions',
            industry: 'Healthcare IT',
            employees: 120,
            headquarters: 'Boston, MA',
          },
          checksum: 'hash_source_2',
          fetched_at: new Date(),
          created_at: new Date(),
        },
      ])
      .onConflictDoNothing()
      .returning();

    console.log('✓ Sources created');

    // 7. Create citations
    await db
      .insert(citations)
      .values([
        {
          organization_id: orgId,
          entity_type: 'company',
          entity_id: comp1?.id || 'company_1',
          source_id: source1?.id || 'source_1',
          claim: 'TechVenture Capital focuses on B2B SaaS investments',
          confidence: 95,
          created_at: new Date(),
        },
        {
          organization_id: orgId,
          entity_type: 'person',
          entity_id: person1?.id || 'person_1',
          source_id: source1?.id || 'source_1',
          claim: 'Sarah Chen serves as CIO with focus on enterprise software',
          confidence: 94,
          created_at: new Date(),
        },
      ])
      .onConflictDoNothing()
      .returning();

    console.log('✓ Citations created');

    // 8. Create research sessions
    const [session1] = await db
      .insert(researchSessions)
      .values([
        {
          organization_id: orgId,
          project_id: project1?.id || 'project_1',
          status: 'completed',
          query: 'Find FinTech investment partners interested in B2B SaaS',
          started_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          completed_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
      ])
      .onConflictDoNothing()
      .returning();

    console.log('✓ Research sessions created');
    console.log('\n✅ Database seeding completed successfully!\n');
  } catch (error) {
    console.error('❌ Seeding error:', error);
    throw error;
  }
}

// Run seed on module load in development
if (process.env.NODE_ENV === 'development') {
  seedDatabase().catch(console.error);
}
