export interface Province {
  id: string;
  name: string;
  districts: District[];
}

export interface District {
  id: string;
  name: string;
}

export const provinces: Province[] = [
  {
    id: "western",
    name: "Western",
    districts: [
      { id: "colombo", name: "Colombo" },
      { id: "gampaha", name: "Gampaha" },
      { id: "kalutara", name: "Kalutara" },
    ],
  },
  {
    id: "central",
    name: "Central",
    districts: [
      { id: "kandy", name: "Kandy" },
      { id: "matale", name: "Matale" },
      { id: "nuwara-eliya", name: "Nuwara Eliya" },
    ],
  },
  {
    id: "southern",
    name: "Southern",
    districts: [
      { id: "galle", name: "Galle" },
      { id: "matara", name: "Matara" },
      { id: "hambantota", name: "Hambantota" },
    ],
  },
  {
    id: "northern",
    name: "Northern",
    districts: [
      { id: "jaffna", name: "Jaffna" },
      { id: "kilinochchi", name: "Kilinochchi" },
      { id: "mannar", name: "Mannar" },
      { id: "vavuniya", name: "Vavuniya" },
      { id: "mullaitivu", name: "Mullaitivu" },
    ],
  },
  {
    id: "eastern",
    name: "Eastern",
    districts: [
      { id: "batticaloa", name: "Batticaloa" },
      { id: "ampara", name: "Ampara" },
      { id: "trincomalee", name: "Trincomalee" },
    ],
  },
  {
    id: "north-western",
    name: "North Western",
    districts: [
      { id: "kurunegala", name: "Kurunegala" },
      { id: "puttalam", name: "Puttalam" },
    ],
  },
  {
    id: "north-central",
    name: "North Central",
    districts: [
      { id: "anuradhapura", name: "Anuradhapura" },
      { id: "polonnaruwa", name: "Polonnaruwa" },
    ],
  },
  {
    id: "uva",
    name: "Uva",
    districts: [
      { id: "badulla", name: "Badulla" },
      { id: "monaragala", name: "Monaragala" },
    ],
  },
  {
    id: "sabaragamuwa",
    name: "Sabaragamuwa",
    districts: [
      { id: "ratnapura", name: "Ratnapura" },
      { id: "kegalle", name: "Kegalle" },
    ],
  },
];

export const provinceById = (id: string): Province | undefined =>
  provinces.find((province) => province.id === id);

export const districtsOf = (provinceId: string): District[] =>
  provinceById(provinceId)?.districts ?? [];

export const districtById = (id: string): District | undefined =>
  provinces.flatMap((province) => province.districts).find((d) => d.id === id);
