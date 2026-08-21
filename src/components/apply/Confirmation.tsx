import { brandById } from "../../data/brands";
import type { Device, MonthlyPlan } from "../../data/devices";
import { showroomById } from "../../data/showrooms";
import { formatLKR, formatTenure } from "../../lib/format";
import { cn } from "../../lib/cn";
import type { ApplicationData } from "../../lib/validation";
import Button from "../ui/Button";

interface ConfirmationProps {
  data: ApplicationData;
  device: Device;
  plan: MonthlyPlan;
  reference: string;
}

export default function Confirmation({
  data,
  device,
  plan,
  reference,
}: ConfirmationProps) {
  const brand = brandById(device.brand);
  const fullName = `${brand?.name ?? ""} ${device.name}`.trim();
  const showroom = showroomById(data.showroom);

  return (
    <div className="step-from-right rounded-card bg-surface p-7 text-center shadow-rest sm:p-12">
      <span
        className={cn(
          "mx-auto grid h-16 w-16 place-items-center rounded-full",
          "bg-success-soft text-success",
        )}
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
          <path
            d="m5 12.5 4.5 4.5L19 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      <h1 className="mt-7 text-[28px] font-semibold tracking-[-0.02em] sm:text-[32px]">
        Enquiry Sent
      </h1>

      <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-text-muted">
        {showroom?.name ?? "The showroom"} has been notified and will call you
        on {data.phone} to go through the next steps.
      </p>

      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-text-subtle">
        This is not an approval and the phone is not being held for you. The
        showroom will confirm your documents and the final plan before anything
        is agreed.
      </p>

      <div className="mx-auto mt-8 max-w-md rounded-input bg-bg p-5 text-left">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[13px] font-medium tracking-[0.01em] text-text-subtle">
            Reference
          </span>
          <span className="text-[15px] font-semibold tabular-nums">
            {reference}
          </span>
        </div>

        <div className="my-4 h-px bg-divider" />

        <div className="flex items-start justify-between gap-4">
          <span className="text-[13px] font-medium tracking-[0.01em] text-text-subtle">
            Device
          </span>
          <span className="text-right text-[15px]">{fullName}</span>
        </div>

        <div className="mt-3 flex items-start justify-between gap-4">
          <span className="text-[13px] font-medium tracking-[0.01em] text-text-subtle">
            Plan
          </span>
          <span className="text-right text-[15px]">
            {formatLKR(plan.monthly)} / month for {formatTenure(plan.months)}
          </span>
        </div>

        <div className="mt-3 flex items-start justify-between gap-4">
          <span className="text-[13px] font-medium tracking-[0.01em] text-text-subtle">
            Collect from
          </span>
          <span className="text-right text-[15px]">
            {showroom?.name ?? "—"}
          </span>
        </div>
      </div>

      <p className="mt-6 text-[13px] text-text-subtle">
        Take your NIC and a recent billing proof when you visit.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button
          size="lg"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Back to phones
        </Button>
      </div>
    </div>
  );
}
