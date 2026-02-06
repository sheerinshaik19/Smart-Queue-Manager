import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const queueEntries = pgTable("queue_entries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  tokenNumber: integer("token_number").notNull(),
  joinedAt: timestamp("joined_at").defaultNow(),
  status: text("status").notNull().default("waiting"), // waiting, served
});

export const insertQueueEntrySchema = createInsertSchema(queueEntries).pick({
  name: true,
});

export type QueueEntry = typeof queueEntries.$inferSelect;
export type InsertQueueEntry = z.infer<typeof insertQueueEntrySchema>;
