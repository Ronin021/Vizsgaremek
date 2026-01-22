// Order Model
export interface Order {
  id: number;
  user_id: number;
  total_price: number;
  date: string;
  status: string;
}
