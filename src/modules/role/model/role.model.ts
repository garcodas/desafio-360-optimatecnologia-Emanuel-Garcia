import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database";
import dayjs from "dayjs";

export class Role extends Model {
  Id?: number;
  Name!: string;
  CreatedAt!: Date;
  ModifiedAt?: Date;
}

Role.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    modelName: "Role",
    tableName: "Role",
    timestamps: true,
    createdAt: "CreatedAt",
    updatedAt: "ModifiedAt",
  }
);
