import { BaseType } from "./BaseType";

interface Product extends BaseType {
  Name: string;
  Brand: string;
  BarCode: string;
  Stock: number;
  Price: number;
  ImageUrl: string;
  StatusId: number;
  UserId: number;
  ProductCategoryId: number;
}

export type { Product };
