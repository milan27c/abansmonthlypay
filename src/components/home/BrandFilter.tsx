import Chip from "../ui/Chip";
import type { Brand } from "../../data/brands";

interface BrandFilterProps {
  /** Only the brands that actually have something in the current result set. */
  brands: Brand[];
  selected: string | null;
  onSelect: (brandId: string | null) => void;
  totalCount: number;
  countFor: (brandId: string) => number;
}

export default function BrandFilter({
  brands,
  selected,
  onSelect,
  totalCount,
  countFor,
}: BrandFilterProps) {
  if (brands.length === 0) return null;

  return (
    <div
      role="group"
      aria-label="Filter by brand"
      className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
    >
      <Chip selected={selected === null} onClick={() => onSelect(null)}>
        All brands
        <span className="opacity-60">{totalCount}</span>
      </Chip>

      {brands.map((brand) => (
        <Chip
          key={brand.id}
          selected={selected === brand.id}
          onClick={() => onSelect(selected === brand.id ? null : brand.id)}
        >
          {/*
            Names only. The supplied logos carry too much internal whitespace
            to stay legible at chip size, and a solid primary fill would swallow
            them under `mix-blend-multiply`.
          */}
          {brand.name}
          <span className="opacity-60">{countFor(brand.id)}</span>
        </Chip>
      ))}
    </div>
  );
}
