// Ideiglenes adatok mig nincsenek osszefetchelve 

export const products = [
  {
    id: 1,
    name: "Modern kanapé",
    category: "Nappali",
    price: 289900,
    inStock: 8,
    description:
      "Elegáns, modern dizájnú kanapé, kényelmes ülőfelülettel és tartós szerkezettel. Tökéletes választás kortárs nappali berendezéséhez.",
    image: "/images/kep1.jpg"
  },
  {
    id: 2,
    name: "Étkező garnitúra",
    category: "Étkező",
    price: 453631,
    inStock: 5,
    description:
      "Prémium étkező garnitúra, amely modern stílust visz az otthonodba.",
    image: "/images/kep2.jpg"
  },
  
];

export const orders = [
  {
    id: 1,
    customer: "Kiss János",
    date: "2025-10-15",
    amount: 289900,
    status: "Feldolgozás alatt",
  },
  {
    id: 2,
    customer: "Nagy Anna",
    date: "2025-10-14",
    amount: 549900,
    status: "Szállítás alatt",
  },
  {
    id: 3,
    customer: "Kovács Péter",
    date: "2025-10-13",
    amount: 124900,
    status: "Kiszállítva",
  },
];
