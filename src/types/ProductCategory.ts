import { BaseType } from "./BaseType";
import { Status } from "./Status";

interface ProductCategory extends BaseType {
  Name: string;
  StatusId: number;
  UserId: number;
  Status?: Status;
}

interface ProductCategoryQueryResponse {
  Id: number;
  Name: string;
  StatusId: number;
  UserId: number;
  StatusName: string;
}

export type { ProductCategory, ProductCategoryQueryResponse };
