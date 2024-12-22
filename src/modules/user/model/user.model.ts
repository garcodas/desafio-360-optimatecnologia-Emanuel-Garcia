import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database";
import dayjs from "dayjs";

export class User extends Model {
  Id?: number;
  FullName!: string;
  PasswordHash!: string;
  BirthDate!: Date;
  Email!: string;
  Phone!: string;
  RoleId!: number;
  ClientId!: number;
  StatusId!: number;
  CreatedAt!: Date;
  ModifiedAt?: Date;
}

User.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PasswordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    BirthDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ClientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    StatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CreatedAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    ModifiedAt: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "User",
    timestamps: false,
  }
);
