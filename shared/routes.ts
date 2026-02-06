import { z } from 'zod';
import { insertQueueEntrySchema, queueEntries } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  queue: {
    join: {
      method: 'POST' as const,
      path: '/api/queue/join',
      input: insertQueueEntrySchema,
      responses: {
        201: z.custom<typeof queueEntries.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/queue',
      responses: {
        200: z.array(z.custom<typeof queueEntries.$inferSelect>()),
      },
    },
    clear: { // Optional helper for admin to clear or reset
      method: 'POST' as const,
      path: '/api/queue/clear',
      responses: {
        204: z.void(),
      },
    }
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type QueueEntryResponse = z.infer<typeof api.queue.join.responses[201]>;
export type QueueListResponse = z.infer<typeof api.queue.list.responses[200]>;
