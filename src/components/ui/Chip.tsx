import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  children: ReactNode;
}

export default function Chip({
  selected = false,
  className,
  children,
  ...props
}: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4",
        "text-[13px] font-medium tracking-[0.01em] whitespace-nowrap",
        "cursor-pointer transition-all duration-200 ease-state",
        "hover:scale-[1.02] active:scale-100",
        selected
          ? "bg-primary text-white shadow-rest"
          : "bg-surface text-text-muted shadow-rest hover:bg-primary-50 hover:text-primary",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
