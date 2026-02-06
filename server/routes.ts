import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post(api.queue.join.path, async (req, res) => {
    try {
      const input = api.queue.join.input.parse(req.body);
      const entry = await storage.joinQueue(input);
      res.status(201).json(entry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get(api.queue.list.path, async (req, res) => {
    const list = await storage.getQueue();
    res.json(list);
  });

  app.post(api.queue.clear.path, async (req, res) => {
    await storage.clearQueue();
    res.status(204).send();
  });

  // Seed some initial data for demonstration
  if ((await storage.getQueue()).length === 0) {
    await storage.joinQueue({ name: "Alice Johnson" });
    await storage.joinQueue({ name: "Bob Smith" });
    await storage.joinQueue({ name: "Charlie Davis" });
  }

  return httpServer;
}
