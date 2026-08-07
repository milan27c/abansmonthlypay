import Input from "../ui/Input";
import type { ApplicationData, FieldErrors } from "../../lib/validation";

interface StepPersonalProps {
  data: ApplicationData;
  errors: FieldErrors;
  onChange: (field: keyof ApplicationData, value: string) => void;
  onBlur: (field: keyof ApplicationData) => void;
}

export default function StepPersonal({
  data,
  errors,
  onChange,
  onBlur,
}: StepPersonalProps) {
  return (
    <div>
      <h2 className="text-[24px] font-semibold tracking-[-0.02em]">
        Your Details
      </h2>
      <p className="mt-1.5 text-[15px] text-text-muted">
        The showroom uses these to reach you about the application.
      </p>

      <div className="mt-7 grid gap-x-6 gap-y-2 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Input
            label="Full name"
            name="fullName"
            autoComplete="name"
            placeholder="As printed on your NIC"
            value={data.fullName}
            error={errors.fullName}
            onChange={(event) => onChange("fullName", event.target.value)}
            onBlur={() => onBlur("fullName")}
          />
        </div>

        <Input
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={data.email}
          error={errors.email}
          onChange={(event) => onChange("email", event.target.value)}
          onBlur={() => onBlur("email")}
        />

        <Input
          label="Mobile number"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="077 123 4567"
          value={data.phone}
          error={errors.phone}
          onChange={(event) => onChange("phone", event.target.value)}
          onBlur={() => onBlur("phone")}
        />

        <div className="sm:col-span-2">
          <Input
            label="NIC number"
            name="nic"
            autoComplete="off"
            placeholder="199912345678"
            hint="Old or new format both work."
            value={data.nic}
            error={errors.nic}
            onChange={(event) => onChange("nic", event.target.value)}
            onBlur={() => onBlur("nic")}
          />
        </div>
      </div>
    </div>
  );
}
