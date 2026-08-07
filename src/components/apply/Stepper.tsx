import { cn } from "../../lib/cn";

interface StepperProps {
  steps: string[];
  /** Zero-based index of the step being shown. */
  current: number;
}

export default function Stepper({ steps, current }: StepperProps) {
  const progress =
    steps.length > 1 ? (current / (steps.length - 1)) * 100 : 100;

  return (
    <div>
      <ol className="flex items-center justify-between gap-2">
        {steps.map((label, index) => {
          const done = index < current;
          const active = index === current;

          return (
            <li
              key={label}
              className="flex min-w-0 flex-1 flex-col items-center gap-2 sm:flex-row sm:gap-3"
              aria-current={active ? "step" : undefined}
            >
              <span
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full text-[13px] font-semibold tabular-nums",
                  "transition-colors duration-300 ease-state",
                  done && "bg-primary-200 text-primary-800",
                  active && "bg-primary text-white",
                  !done && !active && "bg-surface text-text-subtle shadow-rest",
                )}
              >
                {done ? (
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  >
                    <path
                      d="m3.5 8.5 3 3 6-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </span>

              <span
                className={cn(
                  "truncate text-center text-[13px] font-medium tracking-[0.01em] sm:text-left",
                  "transition-colors duration-300 ease-state",
                  active ? "text-text" : "text-text-subtle",
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>

      <div
        className="mt-5 h-1 overflow-hidden rounded-full bg-primary-100"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={steps.length}
        aria-valuenow={current + 1}
        aria-label={`Step ${current + 1} of ${steps.length}`}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300 ease-state"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
