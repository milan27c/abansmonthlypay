import type { ReactNode } from "react";
import { useCallback } from "react";
import { cn } from "../../lib/cn";
import { useFocusTrap } from "../../lib/hooks";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Labels the dialog for screen readers. */
  title: string;
  className?: string;
  children: ReactNode;
}

export default function Modal({
  open,
  onClose,
  title,
  className,
  children,
}: ModalProps) {
  const close = useCallback(() => onClose(), [onClose]);
  const panelRef = useFocusTrap(open, close);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto p-0 sm:items-center sm:p-6"
      role="presentation"
    >
      <div
        className="modal-backdrop-in fixed inset-0 bg-primary-900/40 backdrop-blur-[2px]"
        onClick={close}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "modal-panel-in relative w-full max-w-4xl bg-surface shadow-raised",
          "rounded-t-card sm:rounded-card",
          // `dvh`, not `vh`: on a phone `vh` measures the viewport with the
          // browser chrome retracted, which hides the foot of the panel under it.
          "max-h-[92dvh] overflow-y-auto sm:max-h-[88dvh]",
          className,
        )}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className={cn(
            "absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full",
            "bg-bg text-text-muted transition-all duration-200 ease-state",
            "cursor-pointer hover:bg-primary-100 hover:text-primary hover:scale-[1.02]",
          )}
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
            <path
              d="m4 4 8 8M12 4l-8 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {children}
      </div>
    </div>
  );
}
