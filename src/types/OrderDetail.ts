import { Product } from "./Product";

interface OrderDetail {
  Id?: number;
  Qty: number;
  UnitPrice: number;
  SubTotal: number;
  OrderId: number;
  ProductId: number;
  Product?: Product;
}

export type { OrderDetail };