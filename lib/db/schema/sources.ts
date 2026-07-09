import { pgTable, text, varchar, timestamp, index, jsonb } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { organizations } from './organizations';

export const sources = pgTable(
  'sources',
  {
    id: varchar('id', { length: 26 }).primaryKey().default(sql`gen_ulid()`),
    organization_id: varchar('organization_id', { length: 26 })
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    provider: text('provider').notNull(), // 'crunchbase', 'linkedin', 'web', 'user_input', etc
    url: text('url'),
    title: text('title'),
    raw_payload: jsonb('raw_payload'), // Immutable source data
    checksum: text('checksum').notNull(), // SHA256 of raw_payload for deduplication
    fetched_at: timestamp('fetched_at', { withTimezone: true }),
    created_at: timestamp('created_at', { withTimezone: true }).notNull().default(sql`now()`),
  },
  (table) => [
    index('idx_source_org_id').on(table.organization_id),
    index('idx_source_provider').on(table.provider),
    index('idx_source_checksum').on(table.checksum),
    index('idx_source_created_at').on(table.created_at),
  ]
);
