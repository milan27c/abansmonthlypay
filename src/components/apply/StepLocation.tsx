import Input from "../ui/Input";
import Select from "../ui/Select";
import { districtsOf, provinces } from "../../data/locations";
import type { ApplicationData, FieldErrors } from "../../lib/validation";

interface StepLocationProps {
  data: ApplicationData;
  errors: FieldErrors;
  onChange: (field: keyof ApplicationData, value: string) => void;
  onBlur: (field: keyof ApplicationData) => void;
}

export default function StepLocation({
  data,
  errors,
  onChange,
  onBlur,
}: StepLocationProps) {
  const districts = data.province ? districtsOf(data.province) : [];

  return (
    <div>
      <h2 className="text-[24px] font-semibold tracking-[-0.02em]">
        Where Are You?
      </h2>
      <p className="mt-1.5 text-[15px] text-text-muted">
        This decides which showrooms we can offer you next.
      </p>

      <div className="mt-7 grid gap-x-6 gap-y-2 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Input
            label="Address"
            name="address"
            autoComplete="street-address"
            placeholder="House number, street, city"
            value={data.address}
            error={errors.address}
            onChange={(event) => onChange("address", event.target.value)}
            onBlur={() => onBlur("address")}
          />
        </div>

        <Select
          label="Province"
          name="province"
          placeholder="Select province"
          value={data.province}
          error={errors.province}
          options={provinces.map((province) => ({
            value: province.id,
            label: province.name,
          }))}
          onChange={(event) => onChange("province", event.target.value)}
          onBlur={() => onBlur("province")}
        />

        <Select
          label="District"
          name="district"
          placeholder={
            data.province ? "Select district" : "Choose a province first"
          }
          disabled={!data.province}
          value={data.district}
          error={errors.district}
          options={districts.map((district) => ({
            value: district.id,
            label: district.name,
          }))}
          onChange={(event) => onChange("district", event.target.value)}
          onBlur={() => onBlur("district")}
        />
      </div>
    </div>
  );
}
