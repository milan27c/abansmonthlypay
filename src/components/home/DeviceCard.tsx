import { brandById } from "../../data/brands";
import type { Device } from "../../data/devices";
import { headlinePlan, isAffordable } from "../../lib/affordability";
import { cn } from "../../lib/cn";
import { formatLKR, formatTenure } from "../../lib/format";
import Button from "../ui/Button";

interface DeviceCardProps {
  device: Device;
  budget: number;
  /** Stagger offset for the grid entrance. */
  delay: number;
  onSelect: (device: Device) => void;
}

export default function DeviceCard({
  device,
  budget,
  delay,
  onSelect,
}: DeviceCardProps) {
  const brand = brandById(device.brand);
  const plan = headlinePlan(device, budget);
  const withinBudget = isAffordable(device, budget);
  const title = `${brand?.name ?? ""} ${device.name}`.trim();

  return (
    /*
      The card is a plain container, not a button: the "View" button inside it
      is the real control, so the whole surface is only a mouse convenience.
      Keyboard and screen reader users get one tab stop, on the button.
    */
    <div
      onClick={() => onSelect(device)}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={cn(
        "card-enter group flex cursor-pointer flex-col overflow-hidden",
        "rounded-card bg-surface p-5 shadow-rest",
        "transition-all duration-200 ease-state hover:-translate-y-1 hover:shadow-raised",
      )}
    >
      {/* Aspect ratio is reserved so nothing shifts as images load. */}
      <div className="relative aspect-[3/2] overflow-hidden rounded-input bg-surface">
        <img
          src={device.image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain transition-transform duration-[400ms] ease-entrance group-hover:scale-[1.04]"
        />

        {/* Orange, not red: over budget is a stretch, not an error. */}
        {!withinBudget && (
          <span className="absolute right-0 top-0 rounded-full bg-warning-soft px-3 py-1 text-[11px] font-semibold tracking-[0.01em] text-warning">
            Slightly over
          </span>
        )}
      </div>

      {/*
        Two lines of title, then an ellipsis. No height is reserved for the
        second line — `mt-auto` on the price block already pins prices to the
        same baseline across a row, so holding it would only add dead space
        under one-line names.
      */}
      <h3 className="mt-6 line-clamp-2 text-[17px] font-medium leading-[1.3] tracking-[-0.01em] text-text">
        {title}
      </h3>

      <div className="mt-auto flex items-end justify-between gap-4 pt-2">
        <div className="min-w-0">
          <p className="text-[26px] font-bold leading-none tracking-[-0.02em] text-primary tabular-nums">
            {formatLKR(plan.monthly)}
            <span className="ml-1 text-[13px] font-medium text-text-subtle">
              /mo
            </span>
          </p>
          <p className="mt-2 text-[13px] text-text-muted">
            over {formatTenure(plan.months)}
          </p>
          <p className="mt-0.5 text-[13px] text-text-subtle">
            {formatLKR(device.price)} cash
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={(event) => {
            // The card already handles the click; don't run it twice.
            event.stopPropagation();
            onSelect(device);
          }}
          aria-label={`View ${title}`}
          className="shrink-0"
        >
          View
        </Button>
      </div>
    </div>
  );
}
