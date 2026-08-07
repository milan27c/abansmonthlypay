import type { InputHTMLAttributes } from "react";
import { useId } from "react";
import { cn } from "../../lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  /** Shown below the field once validation has run. */
  error?: string;
  hint?: string;
}

export default function Input({
  label,
  error,
  hint,
  className,
  id,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;

  return (
    <div className="flex flex-col">
      <label
        htmlFor={inputId}
        className="mb-2 text-[13px] font-medium tracking-[0.01em] text-text-muted"
      >
        {label}
      </label>

      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error || hint ? messageId : undefined}
        className={cn(
          "h-12 w-full rounded-input bg-surface px-4 text-[15px] text-text",
          "placeholder:text-text-subtle",
          "transition-shadow duration-200 ease-state",
          "shadow-rest outline-none",
          error
            ? "ring-2 ring-error/40 focus:ring-error"
            : "focus:ring-2 focus:ring-primary",
          className,
        )}
        {...props}
      />

      {/*
        Reserved line height so the row never shifts when a message appears.
      */}
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
