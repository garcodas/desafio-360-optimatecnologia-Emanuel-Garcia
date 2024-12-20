import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database";

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
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    ModifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
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
