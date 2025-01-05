import { BaseType } from "./BaseType";
import { ProductCategory } from "./ProductCategory";
import { Status } from "./Status";

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
  Status?: Status;
  ProductCategory?: ProductCategory;
}

interface ProductQueryResponse {
  Id: number;
  Name: string;
  Brand: string;
  BarCode: string;
  Stock: number;
  Price: number;
  ImageUrl: string;
  StatusId: number;
  ProductCategoryId: number;
  UserId: number;
  StatusName: string;
  ProductCategoryName: string;
  ProductCategoryStatusId: number;
  ProductCategoryUserId: number;
}

export type { Product, ProductQueryResponse };
