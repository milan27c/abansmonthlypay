import type { SelectHTMLAttributes } from "react";
import { useId } from "react";
import { cn } from "../../lib/cn";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
  hint?: string;
}

export default function Select({
  label,
  options,
  placeholder = "Select",
  error,
  hint,
  className,
  id,
  disabled,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const messageId = `${selectId}-message`;

  return (
    <div className="flex flex-col">
      <label
        htmlFor={selectId}
        className={cn(
          "mb-2 text-[13px] font-medium tracking-[0.01em]",
          disabled ? "text-text-subtle" : "text-text-muted",
        )}
      >
        {label}
      </label>

      <div className="relative">
        <select
          id={selectId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={error || hint ? messageId : undefined}
          className={cn(
            "h-12 w-full appearance-none rounded-input bg-surface pl-4 pr-11 text-[15px]",
            "transition-shadow duration-200 ease-state",
            "shadow-rest outline-none",
            "disabled:cursor-not-allowed disabled:bg-black/[0.02] disabled:text-text-subtle disabled:shadow-none",
            props.value ? "text-text" : "text-text-subtle",
            error
              ? "ring-2 ring-error/40 focus:ring-error"
              : "focus:ring-2 focus:ring-primary",
            className,
          )}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className={cn(
            "pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2",
            disabled ? "text-text-subtle" : "text-text-muted",
          )}
        >
          <path
            d="M4 6.5 8 10.5 12 6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div id={messageId} className="min-h-[22px] pt-1.5">
        {error ? (
          <p className="text-[13px] leading-none text-error">{error}</p>
        ) : hint ? (
          <p className="text-[13px] leading-none text-text-subtle">{hint}</p>
        ) : null}
      </div>
    </div>
  );
}
