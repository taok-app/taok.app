import { pgTable, text, timestamp, varchar, index } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const organizations = pgTable(
  'organizations',
  {
    id: varchar('id', { length: 26 }).primaryKey().default(sql`gen_ulid()`),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    stripe_customer_id: text('stripe_customer_id'),
    created_at: timestamp('created_at', { withTimezone: true }).notNull().default(sql`now()`),
    updated_at: timestamp('updated_at', { withTimezone: true }).notNull().default(sql`now()`),
  },
  (table) => [
    index('idx_org_slug').on(table.slug),
    index('idx_org_created_at').on(table.created_at),
  ]
);
