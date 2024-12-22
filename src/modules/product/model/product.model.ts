import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database";
import dayjs from "dayjs";

export class Product extends Model {
  Id?: number;
  Name!: string;
  Brand!: string;
  Barcode!: string;
  Stock!: number;
  Price!: number;
  ImageUrl!: string;
  ProductCategoryId!: number;
  UserId!: number;
  StatusId!: number;
  CreatedAt!: Date;
  ModifiedAt?: Date;
}

Product.init(
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
    Brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Barcode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Stock: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ImageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProductCategoryId: {
      type: DataTypes.INTEGER,
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
    modelName: "Product",
    tableName: "Product",
    timestamps: false,
    createdAt: "CreatedAt",
    updatedAt: "ModifiedAt",
  }
);
