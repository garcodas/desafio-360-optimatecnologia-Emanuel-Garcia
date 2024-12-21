import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database";
import dayjs from "dayjs";

export class ProductCategory extends Model {
  Id?: number;
  Name!: string;
  UserId!: number;
  StatusId!: number;
  CreatedAt!: string;
  ModifiedAt?: string;
}

ProductCategory.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    StatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CreatedAt: {
      type: DataTypes.STRING,
      defaultValue: dayjs().toDate().toISOString(),
    },
    ModifiedAt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "ProductCategory",
    tableName: "ProductCategory",
    timestamps: false,
  }
);
