import { Sequelize } from "sequelize";
import { envs } from "./envs";

const sequelize = new Sequelize({
  dialect: "mssql",
  host: envs.DB_SERVER,
  username: envs.DB_USER,
  password: envs.DB_PASSWORD,
  database: envs.DB_DATABASE,
  logging: console.log,
});

export default sequelize;
