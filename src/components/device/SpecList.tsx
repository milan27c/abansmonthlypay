import type { DeviceSpecs } from "../../data/devices";

const LABELS: Record<keyof DeviceSpecs, string> = {
  display: "Display",
  processor: "Processor",
  memory: "Memory",
  storage: "Storage",
  camera: "Camera",
  battery: "Battery",
  network: "Network",
};

interface SpecListProps {
  specs: DeviceSpecs;
}

export default function SpecList({ specs }: SpecListProps) {
  const entries = Object.entries(specs) as Array<[keyof DeviceSpecs, string]>;

  return (
    <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-input bg-divider sm:grid-cols-2">
      {entries.map(([key, value]) => (
        <div key={key} className="bg-surface px-4 py-3">
          <dt className="text-[13px] font-medium tracking-[0.01em] text-text-subtle">
            {LABELS[key]}
          </dt>
          <dd className="mt-0.5 text-[15px] text-text">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
