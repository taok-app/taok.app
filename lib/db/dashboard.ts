import { db } from '@/lib/db';
import { companies, people, researchSessions } from '@/lib/db/schema';
import { eq, count } from 'drizzle-orm';

export async function getDashboardStats(organizationId: string) {
  try {
    const [companyResult] = await db
      .select({ value: count() })
      .from(companies)
      .where(eq(companies.organization_id, organizationId));

    const [peopleResult] = await db
      .select({ value: count() })
      .from(people)
      .where(eq(people.organization_id, organizationId));

    const [sessionResult] = await db
      .select({ value: count() })
      .from(researchSessions)
      .where(eq(researchSessions.organization_id, organizationId));

    return {
      companies: companyResult?.value || 0,
      people: peopleResult?.value || 0,
      researchSessions: sessionResult?.value || 0,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      companies: 0,
      people: 0,
      researchSessions: 0,
    };
  }
}

export async function getRecentCompanies(organizationId: string, limit = 5) {
  try {
    return await db.query.companies.findMany({
      where: eq(companies.organization_id, organizationId),
      orderBy: (companies) => [companies.created_at],
      limit,
    });
  } catch (error) {
    console.error('Error fetching recent companies:', error);
    return [];
  }
}

export async function getRecentResearchSessions(organizationId: string, limit = 5) {
  try {
    return await db.query.researchSessions.findMany({
      where: eq(researchSessions.organization_id, organizationId),
      orderBy: (researchSessions) => [researchSessions.created_at],
      limit,
    });
  } catch (error) {
    console.error('Error fetching recent research sessions:', error);
    return [];
  }
}
