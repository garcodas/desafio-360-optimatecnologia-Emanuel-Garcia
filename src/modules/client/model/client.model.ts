import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database";
import dayjs from "dayjs";

export class Client extends Model {
  Id?: number;
  CompanyName?: string;
  TradeName?: string;
  DeliveryAddress!: string;
  Phone!: string;
  Email!: string;
  CreatedAt!: Date;
  ModifiedAt?: Date;
}

Client.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CompanyName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TradeName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    DeliveryAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CreatedAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: dayjs().format("YYYY-MM-DD"),
    },
    ModifiedAt: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: dayjs().format("YYYY-MM-DD"),
    },
  },
  {
    sequelize,
    modelName: "Client",
    tableName: "Client",
    timestamps: false,
    createdAt: "CreatedAt",
    updatedAt: "ModifiedAt",
  }
);
