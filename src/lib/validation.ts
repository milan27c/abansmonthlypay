export interface ApplicationData {
  fullName: string;
  email: string;
  phone: string;
  nic: string;
  address: string;
  province: string;
  district: string;
  showroom: string;
}

export const emptyApplication: ApplicationData = {
  fullName: "",
  email: "",
  phone: "",
  nic: "",
  address: "",
  province: "",
  district: "",
  showroom: "",
};

export type FieldErrors = Partial<Record<keyof ApplicationData, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Sri Lankan mobile: `0771234567` or `+94771234567`. */
const PHONE = /^(?:\+94|0)\d{9}$/;
/** NIC: old `991234567V` or new `199912345678`. */
const NIC = /^(?:\d{9}[vVxX]|\d{12})$/;

type Validator = (value: string) => string | undefined;

export const validators: Record<keyof ApplicationData, Validator> = {
  fullName: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Enter your full name";
    if (trimmed.length < 3) return "That name looks too short";
    return undefined;
  },

  email: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Enter your email address";
    if (!EMAIL.test(trimmed)) return "Enter a valid email address";
    return undefined;
  },

  phone: (value) => {
    const cleaned = value.replace(/[\s-]/g, "");
    if (!cleaned) return "Enter your mobile number";
    if (!PHONE.test(cleaned)) return "Enter a valid number, like 077 123 4567";
    return undefined;
  },

  nic: (value) => {
    const cleaned = value.replace(/\s/g, "");
    if (!cleaned) return "Enter your NIC number";
    if (!NIC.test(cleaned)) return "Enter a valid NIC, like 199912345678";
    return undefined;
  },

  address: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return "Enter your address";
    if (trimmed.length < 6) return "Enter a bit more detail";
    return undefined;
  },

  province: (value) => (value ? undefined : "Select your province"),
  district: (value) => (value ? undefined : "Select your district"),
  showroom: (value) => (value ? undefined : "Select a showroom"),
};

export const STEP_FIELDS: ReadonlyArray<ReadonlyArray<keyof ApplicationData>> =
  [
    ["fullName", "email", "phone", "nic"],
    ["address", "province", "district"],
    ["showroom"],
    [],
  ];

/** Validates one step and returns only the errors for that step's fields. */
export function validateStep(
  step: number,
  data: ApplicationData,
): FieldErrors {
  const errors: FieldErrors = {};

  for (const field of STEP_FIELDS[step] ?? []) {
    const message = validators[field](data[field]);
    if (message) errors[field] = message;
  }

  return errors;
}
