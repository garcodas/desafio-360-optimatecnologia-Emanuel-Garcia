import { Status } from "./Status";
import { User } from "./User";

interface Client {
  Id?: number;
  CompanyName: string;
  TradeName: string;
  DeliveryAddress: string;
  Phone: string;
  Email: string;
  UserId: number;
  StatusId: number;
  Status?: Status;
  User?: Partial<User>;
}

interface ClientQueryResponse extends Client {
  UserName: string;
  StatusName: string;
}

export type { Client, ClientQueryResponse };
