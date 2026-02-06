import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertQueueEntry } from "@shared/routes";

export function useQueue() {
  return useQuery({
    queryKey: [api.queue.list.path],
    queryFn: async () => {
      const res = await fetch(api.queue.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch queue");
      return api.queue.list.responses[200].parse(await res.json());
    },
    refetchInterval: 5000, // Poll every 5 seconds for updates
  });
}

export function useJoinQueue() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: InsertQueueEntry) => {
      const validated = api.queue.join.input.parse(data);
      const res = await fetch(api.queue.join.path, {
        method: api.queue.join.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.queue.join.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to join queue");
      }
      return api.queue.join.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.queue.list.path] });
    },
  });
}

export function useClearQueue() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(api.queue.clear.path, {
        method: api.queue.clear.method,
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to clear queue");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.queue.list.path] });
    },
  });
}
