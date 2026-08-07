import { brandById } from "../../data/brands";
import type { Device, MonthlyPlan } from "../../data/devices";
import { districtById, provinceById } from "../../data/locations";
import { showroomById } from "../../data/showrooms";
import { formatLKR, formatTenure } from "../../lib/format";
import type { ApplicationData } from "../../lib/validation";

interface StepReviewProps {
  data: ApplicationData;
  device: Device;
  plan: MonthlyPlan;
  /** Jumps back to a step so a line can be corrected without losing anything. */
  onEdit: (step: number) => void;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:gap-6">
      <dt className="w-40 shrink-0 text-[13px] font-medium tracking-[0.01em] text-text-subtle">
        {label}
      </dt>
      <dd className="text-[15px] text-text">{value}</dd>
    </div>
  );
}

function Section({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-input bg-bg p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-[15px] font-semibold">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="cursor-pointer rounded-full px-3 py-1 text-[13px] font-medium text-primary transition-colors duration-200 ease-state hover:bg-primary-soft"
        >
          Edit
        </button>
      </div>
      <dl className="mt-2 divide-y divide-divider">{children}</dl>
    </div>
  );
}

export default function StepReview({
  data,
  device,
  plan,
  onEdit,
}: StepReviewProps) {
  const brand = brandById(device.brand);
  const fullName = `${brand?.name ?? ""} ${device.name}`.trim();
  const showroom = showroomById(data.showroom);

  return (
    <div>
      <h2 className="text-[24px] font-semibold tracking-[-0.02em]">
        Check Everything Over
      </h2>
      <p className="mt-1.5 text-[15px] text-text-muted">
        Once you submit, this goes to the showroom you picked.
      </p>

      <div className="mt-7 flex flex-col gap-4">
        <div className="flex items-center gap-5 rounded-input bg-primary-soft p-5">
          <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-input bg-surface">
            <img
              src={device.image}
              alt={fullName}
              className="h-full w-full object-contain p-1.5 mix-blend-multiply"
            />
          </div>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold">{fullName}</p>
            <p className="mt-1 text-[24px] font-bold leading-none tracking-[-0.02em] text-primary tabular-nums">
              {formatLKR(plan.monthly)}
              <span className="ml-1 text-[13px] font-medium text-text-muted">
                / month
              </span>
            </p>
            <p className="mt-1.5 text-[13px] text-text-muted">
              {formatTenure(plan.months)} · {formatLKR(plan.total)} in total
            </p>
          </div>
        </div>

        <Section title="Your Details" onEdit={() => onEdit(0)}>
          <Row label="Full name" value={data.fullName} />
          <Row label="Email" value={data.email} />
          <Row label="Mobile" value={data.phone} />
          <Row label="NIC" value={data.nic} />
        </Section>

        <Section title="Location" onEdit={() => onEdit(1)}>
          <Row label="Address" value={data.address} />
          <Row
            label="Province"
            value={provinceById(data.province)?.name ?? "—"}
          />
          <Row
            label="District"
            value={districtById(data.district)?.name ?? "—"}
          />
        </Section>

        <Section title="Showroom" onEdit={() => onEdit(2)}>
          <Row label="Branch" value={showroom?.name ?? "—"} />
          <Row label="Address" value={showroom?.address ?? "—"} />
          <Row label="Phone" value={showroom?.phone ?? "—"} />
        </Section>
      </div>
    </div>
  );
}
