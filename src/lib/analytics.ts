declare global {
  interface Window {
    ym?: (id: number, action: string, goal: string, params?: Record<string, unknown>) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

const YM_COUNTER_ID = 108504640;
const GA_MEASUREMENT_ID = "G-EBRBT71FDN";

export function trackGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.ym === "function") {
    window.ym(YM_COUNTER_ID, "reachGoal", goal, params);
  }
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", goal, params);
  }
}

export function trackPageview(path: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("config", GA_MEASUREMENT_ID, { page_path: path });
  }
}
