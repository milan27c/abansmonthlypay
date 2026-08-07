/** `12500` → `Rs. 12,500`. All currency in the prototype is LKR. */
export function formatLKR(value: number): string {
  return `Rs. ${Math.round(value).toLocaleString("en-LK")}`;
}

/** `12500` → `12,500`. For inputs and places that already say "Rs." */
export function formatNumber(value: number): string {
  return Math.round(value).toLocaleString("en-LK");
}

/** `6` → `6 months`, `1` → `1 month`. */
export function formatTenure(months: number): string {
  return `${months} ${months === 1 ? "month" : "months"}`;
}
