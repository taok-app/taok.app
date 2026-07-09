import { pgTable, text, varchar, timestamp, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { organizations } from './organizations';

export const organizationMembers = pgTable(
  'organization_members',
  {
    id: varchar('id', { length: 26 }).primaryKey().default(sql`gen_ulid()`),
    organization_id: varchar('organization_id', { length: 26 })
      .notNull()
      .references(() => organizations.id, { onDelete: 'cascade' }),
    user_id: text('user_id').notNull(),
    role: text('role', { enum: ['owner', 'admin', 'member'] }).notNull().default('member'),
    created_at: timestamp('created_at', { withTimezone: true }).notNull().default(sql`now()`),
  },
  (table) => [
    index('idx_member_org_id').on(table.organization_id),
    index('idx_member_user_id').on(table.user_id),
  ]
);
