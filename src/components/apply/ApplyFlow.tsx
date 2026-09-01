import { useEffect, useMemo, useState } from "react";
import { brandById } from "../../data/brands";
import { deviceById, devices, type Device } from "../../data/devices";
import { headlinePlan } from "../../lib/affordability";
import { cn } from "../../lib/cn";
import { formatLKR, formatTenure } from "../../lib/format";
import {
  emptyApplication,
  validateStep,
  validators,
  type ApplicationData,
  type FieldErrors,
} from "../../lib/validation";
import Button from "../ui/Button";
import Confirmation from "./Confirmation";
import StepPersonal from "./StepPersonal";
import StepShowroom from "./StepShowroom";
import Stepper from "./Stepper";

const STEPS = ["Your Details", "Showroom"];
const LAST_STEP = STEPS.length - 1;

/**
 * The device and plan come in on the query string from the device modal.
 * This island is `client:only`, so reading `window` here is safe.
 */
function readSelection(): { device: Device; months?: number; budget: number } {
  const params = new URLSearchParams(window.location.search);

  return {
    device: deviceById(params.get("device") ?? "") ?? devices[0]!,
    months: Number(params.get("months")) || undefined,
    budget: Number(params.get("budget")) || 0,
  };
}

export default function ApplyFlow() {
  const [{ device, months, budget }] = useState(readSelection);

  const plan =
    device.monthlyPlans.find((p) => p.months === months) ??
    headlinePlan(device, budget);

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [data, setData] = useState<ApplicationData>(emptyApplication);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState<string | null>(null);

  const brand = brandById(device.brand);
  const fullName = `${brand?.name ?? ""} ${device.name}`.trim();

  // Scroll the form back into view when the step changes.
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }, [step, reference]);

  /**
   * Province → District → Showroom is a strict cascade: changing a level up
   * clears everything below it.
   */
  const handleChange = (field: keyof ApplicationData, value: string) => {
    setData((current) => {
      const next = { ...current, [field]: value };
      if (field === "province") {
        next.district = "";
        next.showroom = "";
      }
      if (field === "district") {
        next.showroom = "";
      }
      return next;
    });

    // Clear an error as soon as the field is corrected, but never add one
    // mid-keystroke.
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleBlur = (field: keyof ApplicationData) => {
    const message = validators[field](data[field]);
    setErrors((current) => {
      const next = { ...current };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });
  };

  const goTo = (next: number) => {
    setDirection(next > step ? "forward" : "back");
    setStep(next);
  };

  const handleNext = () => {
    const stepErrors = validateStep(step, data);

    if (Object.keys(stepErrors).length > 0) {
      setErrors((current) => ({ ...current, ...stepErrors }));
      return;
    }

    goTo(Math.min(step + 1, LAST_STEP));
  };

  const handleBack = () => {
    // State is preserved — going back never wipes what has been entered.
    goTo(Math.max(step - 1, 0));
  };

  const handleSubmit = async () => {
    const stepErrors = validateStep(step, data);

    if (Object.keys(stepErrors).length > 0) {
      setErrors((current) => ({ ...current, ...stepErrors }));
      return;
    }

    setSubmitting(true);

    // No email is actually sent. Stand in for the round trip with a delay.
    await new Promise((resolve) => setTimeout(resolve, 1400));

    setReference(
      `TTP-${String(Math.floor(1000 + Math.random() * 9000))}`,
    );
    setSubmitting(false);
  };

  const slideClass =
    direction === "forward" ? "step-from-right" : "step-from-left";

  // `self-start` keeps the card at its own content height — a grid child
  // otherwise stretches to the step column, so it would resize per step and
  // sticky would have no room to move.
  const summary = useMemo(
    () => (
      <aside className="self-start rounded-card bg-surface p-6 shadow-rest lg:sticky lg:top-28">
        <div className="flex items-center gap-4">
          <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-input bg-primary-50">
            <img
              src={device.image}
              alt={fullName}
              className="h-full w-full object-contain p-1.5 mix-blend-multiply"
            />
          </div>
          <div className="min-w-0">
            <p className="text-[13px] font-medium tracking-[0.01em] text-text-subtle">
              Enquiring about
            </p>
            <p className="mt-0.5 text-[15px] font-semibold">{fullName}</p>
          </div>
        </div>

        <div className="my-5 h-px bg-divider" />

        <p className="text-[13px] font-medium tracking-[0.01em] text-text-subtle">
          Your plan
        </p>
        <p className="mt-1 text-[26px] font-bold leading-none tracking-[-0.02em] text-primary tabular-nums">
          {formatLKR(plan.monthly)}
          <span className="ml-1 text-[13px] font-medium text-text-muted">
            / month
          </span>
        </p>
        <p className="mt-2 text-[13px] text-text-muted">
          {formatTenure(plan.months)} · {formatLKR(plan.total)} in total
        </p>
        <p className="mt-0.5 text-[13px] text-text-subtle">
          {formatLKR(device.price)} cash price
        </p>

        <a
          href="/#phones"
          className="mt-5 inline-block rounded-full text-[13px] font-medium text-primary transition-colors duration-200 ease-state hover:underline"
        >
          Choose a different phone
        </a>
      </aside>
    ),
    [device, fullName, plan],
  );

  if (reference) {
    return (
      <div className="mx-auto max-w-2xl">
        <Confirmation
          data={data}
          device={device}
          plan={plan}
          reference={reference}
        />
      </div>
    );
  }

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap items-center gap-2 text-[13px] text-text-muted"
      >
        <a
          href="/"
          className="transition-colors duration-200 ease-state hover:text-primary"
        >
          Home
        </a>
        <span aria-hidden="true" className="text-text-subtle">
          /
        </span>
        <a
          href={`/device/${device.id}`}
          className="transition-colors duration-200 ease-state hover:text-primary"
        >
          {fullName}
        </a>
        <span aria-hidden="true" className="text-text-subtle">
          /
        </span>
        <span aria-current="page" className="font-medium text-text">
          Enquire
        </span>
      </nav>

      <div className="mb-8">
        <h1 className="text-[32px] font-semibold tracking-[-0.02em] sm:text-[40px]">
          Enquire For This Device
        </h1>
        <p className="mt-2 max-w-lg text-[16px] text-text-muted">
          Two short steps. Nothing is charged and no payment details are
          needed.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
        <div>
          <Stepper steps={STEPS} current={step} />

          <div className="mt-8 overflow-hidden">
            {/* Keyed so each step replays its slide instead of swapping. */}
            <div
              key={step}
              className={cn(
                slideClass,
                "rounded-card bg-surface p-6 shadow-rest sm:p-8",
              )}
            >
              {step === 0 && (
                <StepPersonal
                  data={data}
                  errors={errors}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              )}

              {step === 1 && (
                <StepShowroom
                  data={data}
                  errors={errors}
                  onChange={handleChange}
                />
              )}

              <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                {step > 0 ? (
                  <Button
                    variant="secondary"
                    onClick={handleBack}
                    disabled={submitting}
                  >
                    Back
                  </Button>
                ) : (
                  <span />
                )}

                {step < LAST_STEP ? (
                  <Button onClick={handleNext}>Continue</Button>
                ) : (
                  <Button
                    size="lg"
                    onClick={handleSubmit}
                    disabled={submitting}
                    aria-busy={submitting}
                  >
                    {submitting ? "Sending…" : "Send enquiry"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {summary}
      </div>
    </>
  );
}
