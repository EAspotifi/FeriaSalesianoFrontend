const rawBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";
const rawPolling = Number(import.meta.env.VITE_POLLING_INTERVAL_MS ?? 5000);

export const env = {
  apiBaseUrl: rawBaseUrl.replace(/\/$/, ""),
  pollingIntervalMs: Number.isFinite(rawPolling) && rawPolling > 0 ? rawPolling : 5000,
} as const;
