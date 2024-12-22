import dayjs from "dayjs";
import sequelize from "../../../config/database";
import { DataTypes, Model, Sequelize } from "sequelize";
import { Order } from "./order.model";

export class OrderDetail extends Model {
  Id?: number;
  Qty!: number;
  UnitPrice!: number;
  SubTotal!: number;
  OrderId!: number;
  ProductId!: number;
  CreatedAt!: Date;
  ModifiedAt?: Date;

  static associate(models: any) {
    OrderDetail.belongsTo(models.Order, { foreignKey: "OrderId", as: "Order" });
  }
}

export const initOrderDetail = (sequelize: Sequelize) => {
  OrderDetail.init(
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Qty: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      UnitPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      SubTotal: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      OrderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "OrderDetail",
      tableName: "OrderDetail",
      timestamps: false,
    }
  );
};
