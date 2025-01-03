import { DataTypes, Model, Sequelize } from "sequelize";
import dayjs from "dayjs";

export class Status extends Model {
  Id?: number;
  Name!: string;
  CreatedAt!: Date;
  ModifiedAt?: Date;

  // static associate(models: any) {
  //   Status.hasMany(models.ProductCategory, {
  //     foreignKey: "StatusId",
  //     as: "ProductCategories",
  //   });
  // }
}

export const initStatus = (sequelize: Sequelize) => {
  Status.init(
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
      modelName: "Status",
      tableName: "Status",
      timestamps: false,
      createdAt: "CreatedAt",
      updatedAt: "ModifiedAt",
    }
  );
};
