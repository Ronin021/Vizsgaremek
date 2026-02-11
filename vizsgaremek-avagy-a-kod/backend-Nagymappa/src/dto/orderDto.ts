// Order DTO
export interface OrderDto {
  user_id: number;
  total_price: number;
  date: string;
  status: string;
  payment_method: string;
  shipping_address: string;
  phone: string;
}
