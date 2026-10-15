// LMS feature flag (TSD 2.1, 12.1). Server-only, default off.
export function isLmsEnabled(env: Record<string, string | undefined> = process.env): boolean {
  return env.LMS_ENABLED?.trim().toLowerCase() === "true";
}

// Paths owned by the LMS module: UI route groups, LMS APIs and payment webhooks.
const LMS_PREFIXES = ["/learn", "/teach", "/admin/lms", "/api/lms", "/api/webhooks"];

export function isLmsPath(pathname: string): boolean {
  return LMS_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}
