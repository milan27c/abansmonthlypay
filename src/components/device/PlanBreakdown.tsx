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
                // Stacked on mobile, so the marker rides the first line rather
                // than floating against the middle of a four-line block.
                "flex cursor-pointer items-start gap-3 rounded-input px-3.5 py-3.5 sm:items-center sm:gap-4 sm:px-4",
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
                  "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full transition-colors duration-200 ease-state sm:mt-0",
                  selected ? "bg-primary" : "bg-white shadow-rest",
                )}
              >
                {selected && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </span>

              {/*
                One line per figure on a phone — a narrow screen cannot hold
                the tenure and the price side by side without both wrapping
                mid-figure. From `sm` the same four cells fall back into two
                columns, tenure left and price right, so `order` is only ever
                doing work at the small end.
              */}
              <span className="grid min-w-0 flex-1 gap-x-4 sm:grid-cols-[1fr_auto] sm:items-center">
                <span className="order-1 text-[15px] font-semibold text-text sm:order-none sm:col-start-1 sm:row-start-1">
                  {formatTenure(plan.months)}
                </span>

                <span
                  className={cn(
                    "order-2 mt-1 text-[20px] font-bold leading-none tabular-nums sm:order-none sm:col-start-2 sm:row-start-1 sm:mt-0 sm:text-right",
                    selected ? "text-primary" : "text-text",
                  )}
                >
                  {formatLKR(plan.monthly)}
                </span>

                <span
                  className={cn(
                    "order-3 mt-1 text-[13px] sm:order-none sm:col-start-2 sm:row-start-2 sm:text-right",
                    fits ? "text-success" : "text-text-subtle",
                  )}
                >
                  {fits ? "Within your budget" : "per month"}
                </span>

                <span className="order-4 mt-1 text-[13px] text-text-subtle sm:order-none sm:col-start-1 sm:row-start-2 sm:mt-0">
                  {formatLKR(plan.total)} in total
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
