import { useEffect, useState } from "react";
import { brandById } from "../../data/brands";
import type { Device } from "../../data/devices";
import { headlinePlan } from "../../lib/affordability";
import { cn } from "../../lib/cn";
import { formatLKR, formatTenure } from "../../lib/format";
import { useQueryBudget } from "../../lib/hooks";
import Button from "../ui/Button";
import PlanBreakdown from "./PlanBreakdown";
import SpecList from "./SpecList";

interface DeviceDetailProps {
  device: Device;
  /**
   * The shop's live budget. The standalone device page has nothing to pass, so
   * it leaves this out and the budget is read off `?budget=` instead — the same
   * query-string handoff `/apply` already relies on.
   */
  budget?: number;
  /**
   * `modal` pins the panel to a fixed height on desktop and scrolls only the
   * detail column, and leaves room at the top for the close button. `page`
   * takes its height from the content.
   */
  variant?: "modal" | "page";
}

export default function DeviceDetail({
  device,
  budget: budgetProp,
  variant = "modal",
}: DeviceDetailProps) {
  const queryBudget = useQueryBudget();
  const budget = budgetProp ?? queryBudget;

  const [months, setMonths] = useState<number>(0);

  // Open on whichever plan we were headlining on the card.
  useEffect(() => {
    setMonths(headlinePlan(device, budget).months);
  }, [device, budget]);

  const brand = brandById(device.brand);
  const fullName = `${brand?.name ?? ""} ${device.name}`.trim();
  const plan =
    device.monthlyPlans.find((p) => p.months === months) ??
    headlinePlan(device, budget);

  const applyHref = `/apply?device=${device.id}&months=${plan.months}${
    budget > 0 ? `&budget=${budget}` : ""
  }`;

  const inModal = variant === "modal";

  const applyButton = (
    <Button
      size="lg"
      fullWidth
      onClick={() => {
        window.location.href = applyHref;
      }}
    >
      Apply for this device
    </Button>
  );

  const applyNote = (
    <p className="text-center text-[13px] text-text-subtle">
      Takes about two minutes. No payment is taken online.
    </p>
  );

  return (
    <div
      className={cn(
        "grid gap-0 md:grid-cols-2",
        // The page takes its height from the copy; the modal is pinned.
        inModal && "md:h-[86vh] md:max-h-[760px]",
      )}
    >
      {/*
        `min-w-0` on both columns: a grid item's automatic minimum is its
        min-content, and the product shot's intrinsic width carries that well
        past a phone's screen, which drags the whole track out with it.
      */}
      {/* From `md` the panel fills the column, so the tint runs the full height
          of the card either way and the shot centres inside it. */}
      <div className="relative flex min-w-0 aspect-[4/3] items-center justify-center bg-primary-50 sm:aspect-[4/5] md:aspect-auto md:h-full">
        {/*
          `h-full`, not auto: the shot is square, so at phone width its natural
          height runs past the 4:3 panel and spills over the copy underneath it.
          `object-contain` letterboxes it inside the panel instead.
        */}
        <img
          src={device.image}
          alt={fullName}
          decoding="async"
          className="h-full max-h-[440px] w-full object-contain p-8 mix-blend-multiply"
        />
      </div>

      <div
        className={cn(
          "flex min-w-0 flex-col gap-7 p-5 sm:p-8",
          // Clears the modal's close button; the page has a back bar instead.
          inModal ? "pt-14 sm:pt-14 md:h-full md:overflow-y-auto" : "",
        )}
      >
        <div>
          <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-text">
            {fullName}
          </h2>
          <p className="mt-1 text-[15px] text-text-muted">
            {/* `specs.memory` already carries its own "RAM" suffix. */}
            RAM: {device.specs.memory.replace(/\s*RAM$/, "")}
            <span className="mx-2 text-text-subtle">|</span>
            Storage: {device.specs.storage}
          </p>
        </div>

        <div className="rounded-input bg-primary-soft px-4 py-4 sm:px-5">
          <p className="text-[13px] font-medium tracking-[0.01em] text-primary-700">
            You pay
          </p>
          <p className="mt-1 text-[30px] font-bold leading-none tracking-[-0.02em] text-primary tabular-nums sm:text-[34px]">
            {formatLKR(plan.monthly)}
            {/* Wraps as a unit — never "/" on one line and "month" on the next. */}
            <span className="ml-1.5 whitespace-nowrap text-[15px] font-medium text-primary-500">
              / month
            </span>
          </p>
          <p className="mt-2 text-[13px] text-text-muted">
            for {formatTenure(plan.months)} · {formatLKR(plan.total)} in total ·{" "}
            {formatLKR(device.price)} cash price
          </p>
        </div>

        <PlanBreakdown
          device={device}
          budget={budget}
          selectedMonths={plan.months}
          onSelect={(next) => setMonths(next.months)}
        />

        <div>
          <h3 className="mb-3 text-[13px] font-medium tracking-[0.01em] text-text-muted">
            Key Specs
          </h3>
          <SpecList specs={device.specs} />
        </div>

        {inModal ? (
          <div className="flex flex-col gap-3">
            {applyButton}
            {applyNote}
          </div>
        ) : (
          /*
            On the page the button floats at the foot of the screen the whole
            way down, so it is never more than a thumb away. `sticky`, not
            `fixed`, so it comes to rest at the end of the card rather than
            sitting over the footer — which means it has to be a direct child of
            the tall column, since a sticky element can only travel inside its
            own containing block. The note therefore sits above it, and the bar
            carries the card's background and spans the column's padding so the
            copy passes cleanly underneath.
          */
          <>
            {applyNote}
            <div className="sticky bottom-0 z-10 -mx-5 -mt-4 bg-surface px-5 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-4px_16px_rgba(0,0,0,0.08)] md:static md:mx-0 md:mt-0 md:p-0 md:shadow-none">
              {applyButton}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
