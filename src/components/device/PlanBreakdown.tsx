import type { Device, MonthlyPlan } from "../../data/devices";
import { cn } from "../../lib/cn";
import { formatLKR, formatTenure } from "../../lib/format";

interface PlanBreakdownProps {
  device: Device;
  budget: number;
  selectedMonths: number;
  onSelect: (plan: MonthlyPlan) => void;
}

export default function PlanBreakdown({
  device,
  budget,
  selectedMonths,
  onSelect,
}: PlanBreakdownProps) {
  return (
    <fieldset>
      <legend className="mb-3 text-[13px] font-medium tracking-[0.01em] text-text-muted">
        Choose a Plan
      </legend>

      <div className="flex flex-col gap-2">
        {device.monthlyPlans.map((plan) => {
          const selected = plan.months === selectedMonths;
          const fits = budget > 0 && plan.monthly <= budget;

          return (
            <label
              key={plan.months}
              className={cn(
                "flex cursor-pointer items-center gap-4 rounded-input px-4 py-3.5",
                "transition-colors duration-200 ease-state",
                selected
                  ? "bg-primary-soft"
                  : "bg-bg hover:bg-primary-softer",
              )}
            >
              <input
                type="radio"
                name={`plan-${device.id}`}
                value={plan.months}
                checked={selected}
                onChange={() => onSelect(plan)}
                className="sr-only-text"
              />

              <span
                aria-hidden="true"
                className={cn(
                  "grid h-5 w-5 shrink-0 place-items-center rounded-full transition-colors duration-200 ease-state",
                  selected ? "bg-primary" : "bg-white shadow-rest",
                )}
              >
                {selected && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </span>

              <span className="flex-1">
                <span className="block text-[15px] font-semibold text-text">
                  {formatTenure(plan.months)}
                </span>
                <span className="block text-[13px] text-text-subtle">
                  {formatLKR(plan.total)} in total
                </span>
              </span>

              <span className="text-right">
                <span
                  className={cn(
                    "block text-[20px] font-bold leading-none tabular-nums",
                    selected ? "text-primary" : "text-text",
                  )}
                >
                  {formatLKR(plan.monthly)}
                </span>
                <span
                  className={cn(
                    "mt-1 block text-[13px]",
                    fits ? "text-success" : "text-text-subtle",
                  )}
                >
                  {fits ? "Within your budget" : "per month"}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
