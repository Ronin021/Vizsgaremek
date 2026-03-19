// Order Model
export interface Order {
  id: number;
  user_id: number | null;
  total_price: number;
  date: string;
  status: string;
  payment_method: string;
  shipping_address: string;
  phone: string;
  customer_first_name?: string;
  customer_last_name?: string;
  customer_email?: string;
}
