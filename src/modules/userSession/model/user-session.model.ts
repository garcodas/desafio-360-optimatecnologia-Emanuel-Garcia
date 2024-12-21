import { DataTypes, Model } from "sequelize";
import sequelize from "../../../config/database";
import dayjs from "dayjs";

export class UserSession extends Model {
  Id?: number;
  Token!: string;
  UserId!: number;
  ExpiresAt!: Date;
  CreatedAt!: Date;
}

UserSession.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ExpiresAt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CreatedAt: {
      type: DataTypes.STRING,
      defaultValue: dayjs().toDate().toISOString(),
    },
  },
  {
    sequelize,
    modelName: "UserSession",
    tableName: "UserSession",
    timestamps: false,
  }
);
