import dayjs from "dayjs";
import sequelize from "../../../config/database";
import { DataTypes, Model, Sequelize } from "sequelize";
import { OrderDetail } from "./order-detail.model";

export class Order extends Model {
  Id?: number;
  FullName!: string;
  Address!: string;
  Total?: number;
  Email!: string;
  Phone!: string;
  UserId!: number;
  StatusId!: number;
  DeliveryDate?: Date;
  CreatedAt!: Date;
  ModifiedAt?: Date;

  static associate(models: any) {
    Order.hasMany(models.OrderDetail, {
      foreignKey: "OrderId",
      as: "OrderDetails",
    });
  }
}
export const initOrder = (sequelize: Sequelize) => {
  Order.init(
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
      Address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Total: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      Phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Email: {
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
      DeliveryDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
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
      modelName: "Order",
      tableName: "Order",
      timestamps: false,
      createdAt: "CreatedAt",
      updatedAt: "ModifiedAt",
    }
  );
};
