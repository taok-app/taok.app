import { pgTable, text, varchar, timestamp, integer, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { organizations } from './organizations';
import { companies } from './companies';

export const people = pgTable(
  'people',
  {
    id: varchar('id', { length: 26 }).primaryKey().default(sql`gen_ulid()`),
    organization_id: varchar('organization_id', { length: 26 })
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    company_id: varchar('company_id', { length: 26 })
      .notNull()
      .references(() => companies.id, { onDelete: 'cascade' }),
    first_name: text('first_name').notNull(),
    last_name: text('last_name').notNull(),
    full_name: text('full_name').notNull(),
    title: text('title'),
    seniority: text('seniority', { enum: ['c_level', 'vp', 'director', 'manager', 'ic', 'founder', 'other'] }),
    department: text('department'),
    linkedin_url: text('linkedin_url'),
    email: text('email'),
    confidence: integer('confidence').default(0), // 0-100 confidence score
    created_at: timestamp('created_at', { withTimezone: true }).notNull().default(sql`now()`),
    updated_at: timestamp('updated_at', { withTimezone: true }).notNull().default(sql`now()`),
  },
  (table) => [
    index('idx_people_org_id').on(table.organization_id),
    index('idx_people_company_id').on(table.company_id),
    index('idx_people_linkedin_url').on(table.linkedin_url),
    index('idx_people_email').on(table.email),
    index('idx_people_created_at').on(table.created_at),
  ]
);
