import { OrderStatus } from "./order_status";

export interface Order {
    id: number;
    table: number;
    name: string;
    price: number;
    orderStatus: OrderStatus;
  }