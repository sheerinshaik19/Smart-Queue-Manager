import { type QueueEntry, type InsertQueueEntry } from "@shared/schema";

export interface IStorage {
  joinQueue(entry: InsertQueueEntry): Promise<QueueEntry>;
  getQueue(): Promise<QueueEntry[]>;
  clearQueue(): Promise<void>;
}

export class MemStorage implements IStorage {
  private queue: QueueEntry[];
  private currentToken: number;
  private currentId: number;

  constructor() {
    this.queue = [];
    this.currentToken = 1;
    this.currentId = 1;
  }

  async joinQueue(insertEntry: InsertQueueEntry): Promise<QueueEntry> {
    const entry: QueueEntry = {
      id: this.currentId++,
      name: insertEntry.name,
      tokenNumber: this.currentToken++,
      status: "waiting",
      joinedAt: new Date(),
    };
    this.queue.push(entry);
    return entry;
  }

  async getQueue(): Promise<QueueEntry[]> {
    return this.queue;
  }

  async clearQueue(): Promise<void> {
    this.queue = [];
    this.currentToken = 1;
    this.currentId = 1;
  }
}

export const storage = new MemStorage();
