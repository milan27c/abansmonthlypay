export interface Brand {
  id: string;
  name: string;
  /** Wordmark in `public/logos/`. Omitted until the asset is supplied. */
  logo?: string;
}

/*
  Names are title case rather than each maker's own styling (`vivo`, `realme`,
  `itel` all lowercase their wordmarks) so the filter chips and card titles read
  as one consistent list.
*/
export const brands: Brand[] = [
  { id: "vivo", name: "Vivo", logo: "/logos/vivo.png" },
  { id: "oppo", name: "Oppo", logo: "/logos/oppo.png" },
  { id: "redmi", name: "Redmi", logo: "/logos/redmi.png" },
  { id: "realme", name: "Realme", logo: "/logos/Realme-Logo.png" },
  { id: "motorola", name: "Motorola", logo: "/logos/motorola.png" },
  { id: "infinix", name: "Infinix", logo: "/logos/infinix.png" },
  { id: "itel", name: "Itel", logo: "/logos/itel.png" },
  // No wordmark supplied yet — the modal falls back to the name.
  { id: "xiaomi", name: "Xiaomi" },
];

export const brandById = (id: string): Brand | undefined =>
  brands.find((brand) => brand.id === id);
