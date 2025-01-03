import { DataTypes, Model, Sequelize } from "sequelize";
import dayjs from "dayjs";

export class ProductCategory extends Model {
  Id?: number;
  Name!: string;
  UserId!: number;
  StatusId!: number;
  CreatedAt!: Date;
  ModifiedAt?: Date;

  static associate(models: any) {
    ProductCategory.belongsTo(models.Status, {
      foreignKey: "StatusId",
      as: "Status",
    });
  }
}

export const initProductCategory = (sequelize: Sequelize) => {
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
      modelName: "ProductCategory",
      tableName: "ProductCategory",
      timestamps: false,
      createdAt: "CreatedAt",
      updatedAt: "ModifiedAt",
    }
  );
};
