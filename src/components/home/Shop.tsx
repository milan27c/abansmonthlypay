import { useMemo, useState } from "react";
import { brands } from "../../data/brands";
import { devices, lowestMonthly, type Device } from "../../data/devices";
import {
  headlinePlan,
  isAffordable,
  isSlightlyOver,
} from "../../lib/affordability";
import { formatLKR } from "../../lib/format";
import { useDebounced } from "../../lib/hooks";
import DeviceModal from "../device/DeviceModal";
import Button from "../ui/Button";
import AffordabilityInput from "./AffordabilityInput";
import BrandFilter from "./BrandFilter";
import DeviceGrid from "./DeviceGrid";

const DEFAULT_BUDGET = 10000;

export default function Shop() {
  const [budget, setBudget] = useState(DEFAULT_BUDGET);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [showOverBudget, setShowOverBudget] = useState(false);
  const [openDevice, setOpenDevice] = useState<Device | null>(null);

  // The grid should not thrash while the budget is still being typed.
  const activeBudget = useDebounced(budget, 250);

  const affordable = useMemo(
    () => devices.filter((device) => isAffordable(device, activeBudget)),
    [activeBudget],
  );

  const slightlyOver = useMemo(
    () => devices.filter((device) => isSlightlyOver(device, activeBudget)),
    [activeBudget],
  );

  /** Everything on offer at this budget, cheapest monthly first. */
  const inScope = useMemo(() => {
    const byMonthly = (a: Device, b: Device) =>
      headlinePlan(a, activeBudget).monthly -
      headlinePlan(b, activeBudget).monthly;

    // Affordable devices always sort ahead of the stretch options.
    return [
      ...[...affordable].sort(byMonthly),
      ...(showOverBudget ? [...slightlyOver].sort(byMonthly) : []),
    ];
  }, [affordable, slightlyOver, showOverBudget, activeBudget]);

  const availableBrands = useMemo(() => {
    const present = new Set(inScope.map((device) => device.brand));
    return brands.filter((brand) => present.has(brand.id));
  }, [inScope]);

  const visible = useMemo(
    () =>
      selectedBrand === null
        ? inScope
        : inScope.filter((device) => device.brand === selectedBrand),
    [inScope, selectedBrand],
  );

  // A brand chip that no longer has results should not stay selected.
  const activeBrand =
    selectedBrand && availableBrands.some((b) => b.id === selectedBrand)
      ? selectedBrand
      : null;

  const cheapestAvailable = useMemo(
    () => Math.min(...devices.map(lowestMonthly)),
    [],
  );

  const countFor = (brandId: string) =>
    inScope.filter((device) => device.brand === brandId).length;

  const nothingFits = affordable.length === 0;

  /*
    The modal is a desktop control. On a phone the same content is a full page
    with a back button, so the detail view gets the whole screen instead of
    stacking a near-full-height sheet over the grid. The budget travels on the
    query string so the page can headline the same plan the card did.
  */
  const showDevice = (device: Device) => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      setOpenDevice(device);
      return;
    }

    window.location.href = `/device/${device.id}${
      activeBudget > 0 ? `?budget=${activeBudget}` : ""
    }`;
  };

  return (
    <>
      {/*
        Top padding only — the phones section below brings its own `py`, so a
        full `py` here would double up the gap between the two.
      */}
      <section id="affordability" className="scroll-mt-24 pt-14 sm:pt-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mx-auto max-w-3xl">
            <AffordabilityInput
              value={budget}
              onChange={setBudget}
              matchCount={affordable.length}
            />
          </div>
        </div>
      </section>

      <section
        id="phones"
        className="scroll-mt-24 py-14 sm:py-20"
        aria-label="Phones you can afford"
      >
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-8 flex flex-col gap-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-[28px] font-semibold tracking-[-0.02em] sm:text-[32px]">
                {nothingFits ? "Nothing at This Budget Yet" : "Phones for You"}
              </h2>
              <p className="text-[15px] text-text-muted">
                {visible.length}{" "}
                {visible.length === 1 ? "phone" : "phones"} shown
              </p>
            </div>

            <BrandFilter
              brands={availableBrands}
              selected={activeBrand}
              onSelect={setSelectedBrand}
              totalCount={inScope.length}
              countFor={countFor}
            />
          </div>

          {visible.length > 0 ? (
            <DeviceGrid
              devices={visible}
              budget={activeBudget}
              animationKey={`${activeBudget}-${activeBrand ?? "all"}-${showOverBudget}`}
              onSelect={showDevice}
            />
          ) : (
            <div className="rounded-card bg-surface px-6 py-16 text-center shadow-rest">
              <p className="text-[17px] font-semibold">
                No phones match this filter
              </p>
              <p className="mx-auto mt-2 max-w-md text-[15px] text-text-muted">
                {nothingFits
                  ? `Our lowest instalment right now is ${formatLKR(cheapestAvailable)} a month. Raise your budget to that and we will show you what fits.`
                  : "Try another brand, or clear the filter to see everything in range."}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {activeBrand && (
                  <Button
                    variant="secondary"
                    onClick={() => setSelectedBrand(null)}
                  >
                    Clear brand filter
                  </Button>
                )}
                {nothingFits && (
                  <Button onClick={() => setBudget(cheapestAvailable)}>
                    Set budget to {formatLKR(cheapestAvailable)}
                  </Button>
                )}
              </div>
            </div>
          )}

          {/*
            The escape hatch: never leave someone at a dead end when they are
            only a little short.
          */}
          {slightlyOver.length > 0 && !showOverBudget && (
            <div className="mt-10 flex flex-col items-center gap-3 rounded-card bg-primary-soft px-6 py-8 text-center">
              <p className="text-[15px] text-text-muted">
                {slightlyOver.length}{" "}
                {slightlyOver.length === 1 ? "phone sits" : "phones sit"} just
                above your budget.
              </p>
              <Button
                variant="ghost"
                onClick={() => setShowOverBudget(true)}
              >
                Show them anyway
              </Button>
            </div>
          )}

          {showOverBudget && slightlyOver.length > 0 && (
            <div className="mt-10 text-center">
              <Button variant="ghost" onClick={() => setShowOverBudget(false)}>
                Hide phones over budget
              </Button>
            </div>
          )}
        </div>
      </section>

      <DeviceModal
        device={openDevice}
        budget={activeBudget}
        onClose={() => setOpenDevice(null)}
      />
    </>
  );
}
