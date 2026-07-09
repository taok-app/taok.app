import { pgTable, text, varchar, timestamp, integer, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { organizations } from './organizations';
import { sources } from './sources';

export const citations = pgTable(
  'citations',
  {
    id: varchar('id', { length: 26 }).primaryKey().default(sql`gen_ulid()`),
    organization_id: varchar('organization_id', { length: 26 })
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    entity_type: text('entity_type', { enum: ['company', 'person', 'contact'] }).notNull(),
    entity_id: varchar('entity_id', { length: 26 }).notNull(),
    source_id: varchar('source_id', { length: 26 })
      .notNull()
      .references(() => sources.id, { onDelete: 'cascade' }),
    claim: text('claim').notNull(), // The specific claim/fact being cited
    confidence: integer('confidence').default(0), // 0-100 confidence in the claim
    created_at: timestamp('created_at', { withTimezone: true }).notNull().default(sql`now()`),
  },
  (table) => [
    index('idx_citation_org_id').on(table.organization_id),
    index('idx_citation_entity').on(table.entity_type, table.entity_id),
    index('idx_citation_source_id').on(table.source_id),
  ]
);
