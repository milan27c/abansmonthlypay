import { districtById } from "../../data/locations";
import { showroomsIn } from "../../data/showrooms";
import { cn } from "../../lib/cn";
import type { ApplicationData, FieldErrors } from "../../lib/validation";

interface StepShowroomProps {
  data: ApplicationData;
  errors: FieldErrors;
  onChange: (field: keyof ApplicationData, value: string) => void;
}

export default function StepShowroom({
  data,
  errors,
  onChange,
}: StepShowroomProps) {
  const district = districtById(data.district);
  const options = data.district ? showroomsIn(data.district) : [];

  return (
    <div>
      <h2 className="text-[24px] font-semibold tracking-[-0.02em]">
        Pick a Showroom
      </h2>
      <p className="mt-1.5 text-[15px] text-text-muted">
        {district
          ? `Showrooms in ${district.name}. This branch will handle your enquiry.`
          : "Go back and choose a district to see showrooms."}
      </p>

      <div className="mt-7 flex flex-col gap-3">
        {options.map((showroom) => {
          const selected = data.showroom === showroom.id;

          return (
            <label
              key={showroom.id}
              className={cn(
                "flex cursor-pointer items-start gap-4 rounded-input p-4",
                "transition-all duration-200 ease-state",
                selected
                  ? "bg-primary-soft"
                  : "bg-bg hover:bg-primary-softer",
              )}
            >
              <input
                type="radio"
                name="showroom"
                value={showroom.id}
                checked={selected}
                onChange={() => onChange("showroom", showroom.id)}
                className="sr-only-text"
              />

              <span
                aria-hidden="true"
                className={cn(
                  "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full transition-colors duration-200 ease-state",
                  selected ? "bg-primary" : "bg-white shadow-rest",
                )}
              >
                {selected && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-text">
                  {showroom.name}
                </span>
                <span className="mt-0.5 block text-[13px] text-text-muted">
                  {showroom.address}
                </span>
                <span className="mt-0.5 block text-[13px] text-text-subtle">
                  {showroom.phone}
                </span>
              </span>
            </label>
          );
        })}

        {options.length === 0 && (
          <p className="rounded-input bg-bg px-4 py-6 text-center text-[15px] text-text-muted">
            No showrooms to show yet.
          </p>
        )}
      </div>

      <div className="min-h-[22px] pt-2">
        {errors.showroom && (
          <p className="text-[13px] text-error">{errors.showroom}</p>
        )}
      </div>
    </div>
  );
}
