import { pgTable, text, varchar, timestamp, integer, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { organizations } from './organizations';

export const companies = pgTable(
  'companies',
  {
    id: varchar('id', { length: 26 }).primaryKey().default(sql`gen_ulid()`),
    organization_id: varchar('organization_id', { length: 26 })
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    legal_name: text('legal_name').notNull(),
    display_name: text('display_name').notNull(),
    domain: text('domain'),
    website: text('website'),
    linkedin_url: text('linkedin_url'),
    industry: text('industry'),
    description: text('description'),
    location: text('location'),
    employee_count: integer('employee_count'),
    revenue_range: text('revenue_range'),
    funding_stage: text('funding_stage'),
    confidence: integer('confidence').default(0), // 0-100 confidence score
    created_at: timestamp('created_at', { withTimezone: true }).notNull().default(sql`now()`),
    updated_at: timestamp('updated_at', { withTimezone: true }).notNull().default(sql`now()`),
  },
  (table) => [
    index('idx_company_org_id').on(table.organization_id),
    index('idx_company_domain').on(table.domain),
    index('idx_company_created_at').on(table.created_at),
    index('idx_company_org_created').on(table.organization_id, table.created_at),
  ]
);
