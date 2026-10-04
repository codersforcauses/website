// Temp fix for server-only modules leaking into client bundle
export type { AppRouter } from "~/server/api/root"
