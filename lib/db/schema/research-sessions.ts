import { pgTable, text, varchar, timestamp, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { organizations } from './organizations';
import { projects } from './projects';

export const researchSessions = pgTable(
  'research_sessions',
  {
    id: varchar('id', { length: 26 }).primaryKey().default(sql`gen_ulid()`),
    organization_id: varchar('organization_id', { length: 26 })
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    project_id: varchar('project_id', { length: 26 })
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    status: text('status', { enum: ['draft', 'running', 'completed', 'archived'] })
      .notNull()
      .default('draft'),
    query: text('query').notNull(),
    started_at: timestamp('started_at', { withTimezone: true }),
    completed_at: timestamp('completed_at', { withTimezone: true }),
    created_at: timestamp('created_at', { withTimezone: true }).notNull().default(sql`now()`),
  },
  (table) => [
    index('idx_session_org_id').on(table.organization_id),
    index('idx_session_project_id').on(table.project_id),
    index('idx_session_status').on(table.status),
    index('idx_session_created_at').on(table.created_at),
  ]
);
