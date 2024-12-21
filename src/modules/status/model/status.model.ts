import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database";
import dayjs from "dayjs";

export class Status extends Model {
  Id?: number;
  Name!: string;
  CreatedAt!: string;
  ModifiedAt?: string;
}

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
    modelName: "Status",
    tableName: "Status",
    timestamps: false,
  }
);
