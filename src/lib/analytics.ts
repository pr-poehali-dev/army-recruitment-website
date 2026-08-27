declare global {
  interface Window {
    ym?: (id: number, action: string, goal: string, params?: Record<string, unknown>) => void;
  }
}

const YM_COUNTER_ID = 108504640;

export function trackGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.ym === "function") {
    window.ym(YM_COUNTER_ID, "reachGoal", goal, params);
  }
}
