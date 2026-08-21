import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/cn";
import { formatNumber } from "../../lib/format";
import { useAnimatedNumber } from "../../lib/hooks";

const PRESETS = [2000, 5000, 7500, 10000, 15000, 20000, 25000];

interface AffordabilityInputProps {
  value: number;
  onChange: (value: number) => void;
  /** How many phones currently fit — animates between values. */
  matchCount: number;
}

export default function AffordabilityInput({
  value,
  onChange,
  matchCount,
}: AffordabilityInputProps) {
  const [raw, setRaw] = useState(formatNumber(value));
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep the field in step when a preset chip sets the budget.
  useEffect(() => {
    if (!focused) setRaw(formatNumber(value));
  }, [value, focused]);

  const animatedCount = useAnimatedNumber(matchCount, 400);

  const handleChange = (next: string) => {
    const digits = next.replace(/\D/g, "").slice(0, 7);
    setRaw(digits === "" ? "" : formatNumber(Number(digits)));
    onChange(digits === "" ? 0 : Number(digits));
  };

  return (
    <div className="rounded-card bg-surface p-7 shadow-rest sm:p-10">
      <label
        htmlFor="monthly-budget"
        /* Wraps to two lines on a phone, so it carries its own tight leading
           rather than the loose body line-height. */
        className="block text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-text sm:text-[32px]"
      >
        How Much Can You Pay Monthly?
      </label>
      <p className="mt-2 text-[15px] text-text-muted">
        Enter an amount and we will show you every phone that fits.
      </p>

      <div
        className={cn(
          "mt-7 flex items-center gap-3 rounded-input bg-bg px-5 py-4",
          "transition-shadow duration-200 ease-state",
          focused && "ring-2 ring-primary",
        )}
        onClick={() => inputRef.current?.focus()}
      >
        <span className="text-[28px] font-bold leading-none text-text-subtle sm:text-[34px]">
          Rs.
        </span>
        <input
          ref={inputRef}
          id="monthly-budget"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={raw}
          placeholder="10,000"
          aria-describedby="monthly-budget-result"
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            setRaw(formatNumber(value));
          }}
          onChange={(event) => handleChange(event.target.value)}
          className={cn(
            "w-full min-w-0 bg-transparent text-[40px] font-bold leading-none tracking-[-0.02em]",
            "text-text placeholder:text-text-subtle sm:text-[52px]",
            "outline-none",
          )}
        />
        <span className="shrink-0 text-[13px] font-medium tracking-[0.01em] text-text-subtle">
          / month
        </span>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[13px] font-medium tracking-[0.01em] text-text-subtle">
          Quick pick
        </span>
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(preset)}
            aria-pressed={value === preset}
            className={cn(
              "h-9 rounded-full px-4 text-[13px] font-medium",
              "cursor-pointer transition-all duration-200 ease-state hover:scale-[1.02]",
              value === preset
                ? "bg-primary text-white"
                : "bg-primary-soft text-primary hover:bg-primary-100",
            )}
          >
            {formatNumber(preset)}
          </button>
        ))}
      </div>

      {/*
        The count and the nothing-fits notice share one live region, so a screen
        reader hears the swap rather than two competing announcements.
      */}
      <div id="monthly-budget-result" aria-live="polite" className="mt-7">
        {/*
          No amount in the notice copy: the count is computed from the debounced
          budget, so quoting the live figure would contradict it mid-typing.
        */}
        {matchCount === 0 ? (
          <p className="rounded-input bg-error-soft px-5 py-4 text-[15px] font-medium text-error">
            No phones fit this budget yet. Raise it a little and we will show you
            what is within reach.
          </p>
        ) : (
          <p className="text-[15px] text-text-muted">
            <span className="font-bold tabular-nums text-primary">
              {Math.round(animatedCount)}
            </span>{" "}
            {matchCount === 1 ? "phone fits" : "phones fit"} this budget
          </p>
        )}
      </div>
    </div>
  );
}
