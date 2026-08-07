export interface MonthlyPlan {
  /** Tenure in months. */
  months: number;
  /** What the customer pays each month, in LKR. */
  monthly: number;
  /** Total paid across the tenure, in LKR. */
  total: number;
}

export interface DeviceSpecs {
  display: string;
  processor: string;
  memory: string;
  storage: string;
  camera: string;
  battery: string;
  network: string;
}

export interface Device {
  id: string;
  /** Brand id — see `brands.ts`. */
  brand: string;
  /** Model name only. The brand name is joined in at display time. */
  name: string;
  /** Cash price in LKR. */
  price: number;
  /** Front-view product shot. One image per device — no gallery. */
  image: string;
  monthlyPlans: MonthlyPlan[];
  specs: DeviceSpecs;
}

/** Available tenures and the total markup applied to the cash price for each. */
const TENURES: ReadonlyArray<{ months: number; markup: number }> = [
  { months: 6, markup: 1.05 },
  { months: 12, markup: 1.11 },
  { months: 18, markup: 1.17 },
  { months: 24, markup: 1.24 },
];

/**
 * Builds the plan table for a cash price. Monthly figures are rounded up to the
 * nearest Rs. 50 so the numbers read like a real price list, and the total is
 * derived from the rounded monthly so the breakdown always adds up.
 */
function plansFor(price: number): MonthlyPlan[] {
  return TENURES.map(({ months, markup }) => {
    const monthly = Math.ceil((price * markup) / months / 50) * 50;
    return { months, monthly, total: monthly * months };
  });
}

interface DeviceSeed extends Omit<Device, "monthlyPlans"> {}

/*
  Models, cash prices and image numbering follow the Abans listing. Specs are
  the headline figures from each maker's public sheet — close enough to read as
  real, not a substitute for the spec sheet a live catalogue would carry.
*/
const seeds: DeviceSeed[] = [
  {
    id: "motorola-g57",
    brand: "motorola",
    name: "G57",
    price: 82999,
    image: "/products/1/front.png",
    specs: {
      display: '6.72" LCD, 120Hz',
      processor: "Snapdragon 6s Gen 4",
      memory: "8GB RAM",
      storage: "256GB",
      camera: "50MP main + 8MP ultra-wide",
      battery: "5200mAh, 30W charging",
      network: "5G, Dual SIM",
    },
  },
  {
    id: "vivo-v70-fe",
    brand: "vivo",
    name: "V70 FE",
    price: 189990,
    image: "/products/2/front.png",
    specs: {
      display: '6.83" AMOLED, 120Hz',
      processor: "Dimensity 7360-Turbo",
      memory: "12GB RAM",
      storage: "256GB",
      camera: "200MP OIS + 8MP ultra-wide",
      battery: "7000mAh, 90W charging",
      network: "5G, Dual SIM",
    },
  },
  {
    id: "vivo-x300-pro",
    brand: "vivo",
    name: "X300 Pro",
    price: 459990,
    image: "/products/3/front.png",
    specs: {
      display: '6.78" LTPO AMOLED, 120Hz',
      processor: "Dimensity 9500",
      memory: "16GB RAM",
      storage: "512GB",
      camera: "50MP gimbal OIS + 200MP periscope + 50MP ultra-wide",
      battery: "6510mAh, 90W charging",
      network: "5G, Dual SIM",
    },
  },
  {
    id: "xiaomi-17t",
    brand: "xiaomi",
    name: "17T",
    price: 224999,
    image: "/products/4/front.png",
    specs: {
      display: '6.59" AMOLED, 120Hz',
      processor: "Dimensity 8500 Ultra",
      memory: "12GB RAM",
      storage: "256GB",
      camera: "50MP main + 50MP 5x periscope + 12MP ultra-wide",
      battery: "6500mAh, 67W charging",
      network: "5G, Dual SIM",
    },
  },
  {
    id: "redmi-note-15-pro-plus",
    brand: "redmi",
    name: "Note 15 Pro+",
    price: 179999,
    image: "/products/5/front.png",
    specs: {
      display: '6.83" AMOLED, 120Hz',
      processor: "Snapdragon 7s Gen 4",
      memory: "12GB RAM",
      storage: "256GB",
      camera: "50MP OIS + 50MP 2.5x tele + 8MP ultra-wide",
      battery: "7000mAh, 90W charging",
      network: "5G, Dual SIM",
    },
  },
  {
    id: "oppo-reno-15f",
    brand: "oppo",
    name: "Reno 15F",
    price: 180990,
    image: "/products/6/front.png",
    specs: {
      display: '6.57" AMOLED, 120Hz',
      processor: "Snapdragon 6 Gen 1",
      memory: "8GB RAM",
      storage: "256GB",
      camera: "50MP OIS + 8MP ultra-wide + 2MP macro",
      battery: "7000mAh, 80W charging",
      network: "5G, Dual SIM",
    },
  },
  {
    id: "oppo-reno-16f",
    brand: "oppo",
    name: "Reno 16F",
    price: 220990,
    image: "/products/7/front.png",
    specs: {
      display: '6.57" AMOLED, 120Hz',
      processor: "Dimensity 7300 Energy",
      memory: "12GB RAM",
      storage: "256GB",
      camera: "50MP main + 50MP tele + 8MP ultra-wide",
      battery: "7000mAh, 80W charging",
      network: "5G, Dual SIM",
    },
  },
  {
    id: "realme-c85",
    brand: "realme",
    name: "C85",
    price: 79990,
    image: "/products/8/front.png",
    specs: {
      display: '6.8" display, 144Hz',
      processor: "Snapdragon 685",
      memory: "8GB RAM",
      storage: "256GB",
      camera: "50MP main + 2MP depth",
      battery: "7000mAh, 45W charging",
      network: "4G, Dual SIM",
    },
  },
  {
    id: "infinix-note-60",
    brand: "infinix",
    name: "Note 60",
    price: 139999,
    image: "/products/9/front.png",
    specs: {
      display: '6.78" AMOLED, 144Hz',
      processor: "Dimensity 7400 Ultimate",
      memory: "8GB RAM",
      storage: "256GB",
      camera: "50MP main + 8MP ultra-wide",
      battery: "6500mAh, 45W charging",
      network: "5G, Dual SIM",
    },
  },
  {
    id: "infinix-note-60-pro",
    brand: "infinix",
    name: "Note 60 Pro",
    price: 149999,
    image: "/products/10/front.png",
    specs: {
      display: '6.78" AMOLED, 144Hz',
      processor: "Snapdragon 7s Gen 4",
      memory: "12GB RAM",
      storage: "256GB",
      camera: "50MP OIS + 8MP ultra-wide",
      battery: "6500mAh, 90W charging",
      network: "5G, Dual SIM",
    },
  },
  {
    id: "itel-super-26-ultra",
    brand: "itel",
    name: "Super 26 Ultra",
    price: 89999,
    image: "/products/11/front.png",
    specs: {
      display: '6.8" AMOLED, 144Hz',
      processor: "Unisoc T7300",
      memory: "8GB RAM",
      storage: "256GB",
      camera: "50MP main + 2MP depth",
      battery: "6000mAh, 18W charging",
      network: "4G, Dual SIM",
    },
  },
];

export const devices: Device[] = seeds.map((seed) => ({
  ...seed,
  monthlyPlans: plansFor(seed.price),
}));

export const deviceById = (id: string): Device | undefined =>
  devices.find((device) => device.id === id);

/** Cheapest monthly figure a device can be had for, across all tenures. */
export const lowestMonthly = (device: Device): number =>
  Math.min(...device.monthlyPlans.map((plan) => plan.monthly));
