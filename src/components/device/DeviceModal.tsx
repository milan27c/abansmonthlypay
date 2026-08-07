import { useEffect, useState } from "react";
import { brandById } from "../../data/brands";
import type { Device } from "../../data/devices";
import { headlinePlan } from "../../lib/affordability";
import { formatLKR, formatTenure } from "../../lib/format";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import PlanBreakdown from "./PlanBreakdown";
import SpecList from "./SpecList";

interface DeviceModalProps {
  device: Device | null;
  budget: number;
  onClose: () => void;
}

export default function DeviceModal({
  device,
  budget,
  onClose,
}: DeviceModalProps) {
  const [months, setMonths] = useState<number>(0);

  // Open on whichever plan we were headlining on the card.
  useEffect(() => {
    if (device) setMonths(headlinePlan(device, budget).months);
  }, [device, budget]);

  if (!device) return null;

  const brand = brandById(device.brand);
  const fullName = `${brand?.name ?? ""} ${device.name}`.trim();
  const plan =
    device.monthlyPlans.find((p) => p.months === months) ??
    headlinePlan(device, budget);

  const applyHref = `/apply?device=${device.id}&months=${plan.months}${
    budget > 0 ? `&budget=${budget}` : ""
  }`;

  return (
    <Modal
      open={device !== null}
      onClose={onClose}
      title={fullName}
      /* On desktop the panel is a fixed height and only the detail column
         scrolls, so the product shot stays put while specs are read. */
      className="md:overflow-hidden"
    >
      <div className="grid gap-0 md:h-[86vh] md:max-h-[760px] md:grid-cols-2">
        <div className="relative flex aspect-[4/3] items-center justify-center bg-primary-50 sm:aspect-[4/5] md:aspect-auto md:h-full">
          <img
            src={device.image}
            alt={fullName}
            decoding="async"
            className="max-h-[440px] w-full object-contain p-8 mix-blend-multiply"
          />
        </div>

        <div className="flex flex-col gap-7 p-6 pt-14 sm:p-8 sm:pt-14 md:h-full md:overflow-y-auto">
          <div>
            <h2 className="text-[28px] font-semibold tracking-[-0.02em] text-text">
              {fullName}
            </h2>
            <p className="mt-1 text-[15px] text-text-muted">
              {/* `specs.memory` already carries its own "RAM" suffix. */}
              RAM: {device.specs.memory.replace(/\s*RAM$/, "")} · Storage:{" "}
              {device.specs.storage}
            </p>
          </div>

          <div className="rounded-input bg-primary-soft px-5 py-4">
            <p className="text-[13px] font-medium tracking-[0.01em] text-primary-700">
              You pay
            </p>
            <p className="mt-1 text-[34px] font-bold leading-none tracking-[-0.02em] text-primary tabular-nums">
              {formatLKR(plan.monthly)}
              <span className="ml-1.5 text-[15px] font-medium text-primary-500">
                / month
              </span>
            </p>
            <p className="mt-2 text-[13px] text-text-muted">
              for {formatTenure(plan.months)} · {formatLKR(plan.total)} in total
              · {formatLKR(device.price)} cash price
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

          <div className="flex flex-col gap-3">
            <Button
              size="lg"
              fullWidth
              onClick={() => {
                window.location.href = applyHref;
              }}
            >
              Apply for this device
            </Button>
            <p className="text-center text-[13px] text-text-subtle">
              Takes about two minutes. No payment is taken online.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
