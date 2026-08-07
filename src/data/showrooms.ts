export interface Showroom {
  id: string;
  name: string;
  /** District id — see `locations.ts`. */
  district: string;
  address: string;
  phone: string;
}

export const showrooms: Showroom[] = [
  // Western
  {
    id: "colombo-galle-road",
    name: "Abans Colombo 03",
    district: "colombo",
    address: "421 Galle Road, Colombo 03",
    phone: "011 246 1234",
  },
  {
    id: "colombo-elite",
    name: "Abans Elite Kollupitiya",
    district: "colombo",
    address: "498 Galle Road, Kollupitiya, Colombo 03",
    phone: "011 246 5678",
  },
  {
    id: "colombo-maradana",
    name: "Abans Maradana",
    district: "colombo",
    address: "273 Maradana Road, Colombo 10",
    phone: "011 267 9012",
  },
  {
    id: "gampaha-town",
    name: "Abans Gampaha",
    district: "gampaha",
    address: "108 Colombo Road, Gampaha",
    phone: "033 222 3456",
  },
  {
    id: "negombo",
    name: "Abans Negombo",
    district: "gampaha",
    address: "185 Main Street, Negombo",
    phone: "031 222 7890",
  },
  {
    id: "kalutara-town",
    name: "Abans Kalutara",
    district: "kalutara",
    address: "62 Galle Road, Kalutara South",
    phone: "034 222 4567",
  },

  // Central
  {
    id: "kandy-city",
    name: "Abans Kandy City",
    district: "kandy",
    address: "34 Dalada Veediya, Kandy",
    phone: "081 222 1234",
  },
  {
    id: "katugastota",
    name: "Abans Katugastota",
    district: "kandy",
    address: "12 Madawala Road, Katugastota",
    phone: "081 249 5678",
  },
  {
    id: "matale-town",
    name: "Abans Matale",
    district: "matale",
    address: "97 Trincomalee Street, Matale",
    phone: "066 222 3344",
  },
  {
    id: "nuwara-eliya-town",
    name: "Abans Nuwara Eliya",
    district: "nuwara-eliya",
    address: "21 Badulla Road, Nuwara Eliya",
    phone: "052 222 5566",
  },

  // Southern
  {
    id: "galle-fort",
    name: "Abans Galle",
    district: "galle",
    address: "48 Wackwella Road, Galle",
    phone: "091 223 1122",
  },
  {
    id: "matara-town",
    name: "Abans Matara",
    district: "matara",
    address: "155 Anagarika Dharmapala Mawatha, Matara",
    phone: "041 222 3344",
  },
  {
    id: "hambantota-town",
    name: "Abans Hambantota",
    district: "hambantota",
    address: "9 Main Street, Hambantota",
    phone: "047 222 5566",
  },

  // Northern
  {
    id: "jaffna-town",
    name: "Abans Jaffna",
    district: "jaffna",
    address: "270 Hospital Road, Jaffna",
    phone: "021 222 7788",
  },
  {
    id: "kilinochchi-town",
    name: "Abans Kilinochchi",
    district: "kilinochchi",
    address: "44 A9 Road, Kilinochchi",
    phone: "021 228 1199",
  },
  {
    id: "mannar-town",
    name: "Abans Mannar",
    district: "mannar",
    address: "18 Main Street, Mannar",
    phone: "023 222 3311",
  },
  {
    id: "vavuniya-town",
    name: "Abans Vavuniya",
    district: "vavuniya",
    address: "62 Bazaar Street, Vavuniya",
    phone: "024 222 4422",
  },
  {
    id: "mullaitivu-town",
    name: "Abans Mullaitivu",
    district: "mullaitivu",
    address: "7 Hospital Road, Mullaitivu",
    phone: "024 224 5533",
  },

  // Eastern
  {
    id: "batticaloa-town",
    name: "Abans Batticaloa",
    district: "batticaloa",
    address: "88 Trincomalee Road, Batticaloa",
    phone: "065 222 6644",
  },
  {
    id: "ampara-town",
    name: "Abans Ampara",
    district: "ampara",
    address: "31 D.S. Senanayake Street, Ampara",
    phone: "063 222 7755",
  },
  {
    id: "trincomalee-town",
    name: "Abans Trincomalee",
    district: "trincomalee",
    address: "142 Main Street, Trincomalee",
    phone: "026 222 8866",
  },

  // North Western
  {
    id: "kurunegala-town",
    name: "Abans Kurunegala",
    district: "kurunegala",
    address: "56 Colombo Road, Kurunegala",
    phone: "037 222 9977",
  },
  {
    id: "puttalam-town",
    name: "Abans Puttalam",
    district: "puttalam",
    address: "24 Kurunegala Road, Puttalam",
    phone: "032 222 1188",
  },

  // North Central
  {
    id: "anuradhapura-town",
    name: "Abans Anuradhapura",
    district: "anuradhapura",
    address: "310 Main Street, Anuradhapura",
    phone: "025 222 2299",
  },
  {
    id: "polonnaruwa-town",
    name: "Abans Polonnaruwa",
    district: "polonnaruwa",
    address: "15 Batticaloa Road, Kaduruwela, Polonnaruwa",
    phone: "027 222 3300",
  },

  // Uva
  {
    id: "badulla-town",
    name: "Abans Badulla",
    district: "badulla",
    address: "73 Lower Street, Badulla",
    phone: "055 222 4411",
  },
  {
    id: "monaragala-town",
    name: "Abans Monaragala",
    district: "monaragala",
    address: "40 Wellawaya Road, Monaragala",
    phone: "055 227 5522",
  },

  // Sabaragamuwa
  {
    id: "ratnapura-town",
    name: "Abans Ratnapura",
    district: "ratnapura",
    address: "129 Main Street, Ratnapura",
    phone: "045 222 6633",
  },
  {
    id: "kegalle-town",
    name: "Abans Kegalle",
    district: "kegalle",
    address: "82 Kandy Road, Kegalle",
    phone: "035 222 7744",
  },
];

export const showroomsIn = (districtId: string): Showroom[] =>
  showrooms.filter((showroom) => showroom.district === districtId);

export const showroomById = (id: string): Showroom | undefined =>
  showrooms.find((showroom) => showroom.id === id);
