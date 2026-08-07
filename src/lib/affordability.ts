import type { Device, MonthlyPlan } from "../data/devices";
import { lowestMonthly } from "../data/devices";

/** How far over budget a device may sit and still show under "slightly over". */
export const OVER_BUDGET_TOLERANCE = 0.25;

/**
 * The plan we lead with for a given budget: the *shortest* tenure whose monthly
 * figure the customer can actually cover. Shorter tenure means less total paid,
 * so it is always the better offer among the plans that fit.
 */
export function bestPlanFor(
  device: Device,
  budget: number,
): MonthlyPlan | undefined {
  return [...device.monthlyPlans]
    .sort((a, b) => a.months - b.months)
    .find((plan) => plan.monthly <= budget);
}

/** The plan shown when nothing fits — the cheapest monthly on offer. */
export function cheapestPlan(device: Device): MonthlyPlan {
  return device.monthlyPlans.reduce((cheapest, plan) =>
    plan.monthly < cheapest.monthly ? plan : cheapest,
  );
}

/**
 * The plan a card should headline. Falls back to the cheapest plan so a device
 * always has a monthly figure to show, even when it is out of reach.
 */
export function headlinePlan(device: Device, budget: number): MonthlyPlan {
  return bestPlanFor(device, budget) ?? cheapestPlan(device);
}

export function isAffordable(device: Device, budget: number): boolean {
  return lowestMonthly(device) <= budget;
}

/** Within reach if the customer stretches — powers the escape hatch. */
export function isSlightlyOver(device: Device, budget: number): boolean {
  const monthly = lowestMonthly(device);
  return monthly > budget && monthly <= budget * (1 + OVER_BUDGET_TOLERANCE);
}
