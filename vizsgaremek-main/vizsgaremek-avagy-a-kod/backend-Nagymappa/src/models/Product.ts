// Product Model - egyszerű interface amit az adatbázisból kapunk
export interface Product {
  id: number;
  name: string;
  category_id: number;
  price: number;
  description: string;
  stock: number;
}
