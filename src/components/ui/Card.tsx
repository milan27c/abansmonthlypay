import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Lift and step up one shadow level on hover. */
  interactive?: boolean;
  children: ReactNode;
}

export default function Card({
  interactive = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card bg-surface shadow-rest",
        interactive &&
          "transition-all duration-200 ease-state hover:-translate-y-1 hover:shadow-raised",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
