import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/cn";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover shadow-rest hover:shadow-raised",
  secondary: "bg-surface text-text hover:bg-primary-50 shadow-rest",
  // The outline is a ring (box-shadow), not a real border, so it adds no layout.
  outline:
    "bg-transparent text-primary ring-1 ring-inset ring-primary hover:bg-primary-soft hover:text-primary-hover hover:ring-primary-hover",
  ghost: "bg-transparent text-primary hover:bg-primary-soft",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-[15px]",
  lg: "h-13 px-8 text-[16px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Buttons are fully rounded. All of them, every size.
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold",
        "cursor-pointer transition-all duration-200 ease-state",
        "hover:scale-[1.02] active:scale-100",
        "disabled:pointer-events-none disabled:opacity-40",
        variants[variant],
        sizes[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
