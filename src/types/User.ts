import { BaseType } from "./BaseType";

interface User extends BaseType {
  Email: string;
  FullName: string;
  Phone: string;
  BirthDate: Date;
  PasswordHash: string;
  RoleId: number;
  StatusId: number;
  ClientId?: number;
}

export type { User };
