import { brandById } from "../../data/brands";
import type { Device } from "../../data/devices";
import Modal from "../ui/Modal";
import DeviceDetail from "./DeviceDetail";

interface DeviceModalProps {
  device: Device | null;
  budget: number;
  onClose: () => void;
}

/**
 * The desktop view of a device. Phones get the same content as a page instead
 * — see `pages/device/[id].astro` — because a sheet this tall is unusable on a
 * small screen.
 */
export default function DeviceModal({
  device,
  budget,
  onClose,
}: DeviceModalProps) {
  if (!device) return null;

  const brand = brandById(device.brand);
  const fullName = `${brand?.name ?? ""} ${device.name}`.trim();

  return (
    <Modal
      open
      onClose={onClose}
      title={fullName}
      /* On desktop the panel is a fixed height and only the detail column
         scrolls, so the product shot stays put while specs are read. */
      className="md:overflow-hidden"
    >
      <DeviceDetail device={device} budget={budget} variant="modal" />
    </Modal>
  );
}
