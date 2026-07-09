import { pgTable, text, varchar, timestamp, index, jsonb } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { researchSessions } from './research-sessions';

export const messages = pgTable(
  'messages',
  {
    id: varchar('id', { length: 26 }).primaryKey().default(sql`gen_ulid()`),
    research_session_id: varchar('research_session_id', { length: 26 })
      .notNull()
      .references(() => researchSessions.id, { onDelete: 'cascade' }),
    role: text('role', { enum: ['user', 'assistant'] }).notNull(),
    content: text('content').notNull(),
    metadata: jsonb('metadata'), // Tool calls, citations, etc
    created_at: timestamp('created_at', { withTimezone: true }).notNull().default(sql`now()`),
  },
  (table) => [
    index('idx_message_session_id').on(table.research_session_id),
    index('idx_message_created_at').on(table.created_at),
  ]
);
