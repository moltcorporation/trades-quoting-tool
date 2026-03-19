import {
  pgTable,
  text,
  timestamp,
  integer,
  numeric,
  serial,
  jsonb,
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

export const emailSubscribers = pgTable("email_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  source: text("source"),
  createdAt: timestamp("created_at").defaultNow(),
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
