import { pgTable, text, varchar, timestamp, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { organizations } from './organizations';
import { people } from './people';
import { companies } from './companies';

export const contacts = pgTable(
  'contacts',
  {
    id: varchar('id', { length: 26 }).primaryKey().default(sql`gen_ulid()`),
    organization_id: varchar('organization_id', { length: 26 })
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    person_id: varchar('person_id', { length: 26 })
      .notNull()
      .references(() => people.id, { onDelete: 'cascade' }),
    company_id: varchar('company_id', { length: 26 })
      .notNull()
      .references(() => companies.id, { onDelete: 'cascade' }),
    status: text('status', { enum: ['prospect', 'lead', 'qualified', 'engaged', 'customer', 'archived'] })
      .notNull()
      .default('prospect'),
    source: text('source'),
    notes: text('notes'),
    created_at: timestamp('created_at', { withTimezone: true }).notNull().default(sql`now()`),
    updated_at: timestamp('updated_at', { withTimezone: true }).notNull().default(sql`now()`),
  },
  (table) => [
    index('idx_contact_org_id').on(table.organization_id),
    index('idx_contact_person_id').on(table.person_id),
    index('idx_contact_company_id').on(table.company_id),
    index('idx_contact_status').on(table.status),
  ]
);
