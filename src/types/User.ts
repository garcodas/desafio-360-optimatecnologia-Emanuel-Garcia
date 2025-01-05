import { BaseType } from "./BaseType";
import { Role } from "./Role";
import { Status } from "./Status";

interface User extends BaseType {
  Email: string;
  FullName: string;
  Phone: string;
  BirthDate: Date;
  PasswordHash?: string;
  RoleId: number;
  StatusId: number;
  Status?: Status;
  Role?: Role;
}

interface UserQueryResponse extends User {
  StatusName: string;
  RoleName: string;
}

export type { User, UserQueryResponse };
