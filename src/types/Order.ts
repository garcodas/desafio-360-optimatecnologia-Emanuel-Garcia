import { BaseType } from "./BaseType";
import { OrderDetail } from "./OrderDetail";
import { Status } from "./Status";

interface Order extends BaseType {
  Id?: number;
  FullName: string;
  Address: string;
  Phone: string;
  Email: string;
  DelieveryDate?: Date;
  Total: number;
  UserId?: number;
  StatusId?: number;
  Status?: Status;
  OrderDetail?: OrderDetail;
}

interface OrderQueryResponse extends Order {
  StatusName: string;
}

export type { Order, OrderQueryResponse };
