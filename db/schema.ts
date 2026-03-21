import {
  pgTable,
  text,
  timestamp,
  integer,
  numeric,
  jsonb,
  index,
  serial,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const users = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name").notNull(),
  businessName: text("business_name").notNull(),
  phone: text("phone"),
  city: text("city"),
  state: text("state"),
  tradeType: text("trade_type"),
  plan: text("plan").default("free").notNull(),
  stripeCustomerId: text("stripe_customer_id"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const quotes = pgTable("quotes", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  clientName: text("client_name").notNull(),
  clientEmail: text("client_email"),
  clientPhone: text("client_phone"),
  title: text("title").notNull(),
  lineItems: jsonb("line_items")
    .$type<{ description: string; quantity: number; unitPrice: number }[]>()
    .notNull(),
  subtotal: integer("subtotal").notNull(),
  taxRate: numeric("tax_rate", { precision: 5, scale: 4 }).default("0"),
  total: integer("total").notNull(),
  status: text("status").default("draft").notNull(),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  sentAt: timestamp("sent_at"),
  approvedAt: timestamp("approved_at"),
});

export const feedback = pgTable("feedback", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  email: text("email"),
  category: text("category").default("general").notNull(),
  intent: text("intent"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const payments = pgTable("payments", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  quoteId: text("quote_id")
    .notNull()
    .references(() => quotes.id),
  amount: integer("amount").notNull(),
  stripePaymentIntent: text("stripe_payment_intent"),
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const dripSchedule = pgTable("drip_schedule", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  emailStep: integer("email_step").notNull(),
  sendAt: timestamp("send_at").notNull(),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const dripUnsubscribes = pgTable("drip_unsubscribes", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const conversionEvents = pgTable(
  "conversion_events",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => nanoid()),
    userId: text("user_id").references(() => users.id),
    eventType: text("event_type").notNull(),
    properties: text("properties"),
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("conversion_events_event_type_idx").on(table.eventType),
    index("conversion_events_utm_source_idx").on(table.utmSource),
    index("conversion_events_created_at_idx").on(table.createdAt),
  ]
);
