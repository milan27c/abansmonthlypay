import type { Device } from "../../data/devices";
import DeviceCard from "./DeviceCard";

interface DeviceGridProps {
  devices: Device[];
  budget: number;
  /**
   * Changing this remounts the grid so cards replay their entrance instead of
   * hard-swapping when a filter changes.
   */
  animationKey: string;
  onSelect: (device: Device) => void;
}

export default function DeviceGrid({
  devices,
  budget,
  animationKey,
  onSelect,
}: DeviceGridProps) {
  return (
    <div
      key={animationKey}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {devices.map((device, index) => (
        <DeviceCard
          key={device.id}
          device={device}
          budget={budget}
          delay={Math.min(index, 8) * 70}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
