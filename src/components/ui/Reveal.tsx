import type { ReactNode } from "react";
import { cn } from "../../lib/cn";
import { useReveal } from "../../lib/hooks";

interface RevealProps {
  /** Stagger offset in ms — 60–80ms per grid item reads best. */
  delay?: number;
  className?: string;
  children: ReactNode;
}

export default function Reveal({
  delay = 0,
  className,
  children,
}: RevealProps) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn("reveal", shown && "reveal-in", className)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
