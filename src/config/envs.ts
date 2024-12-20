import dotenv from "dotenv";
dotenv.config();

interface IEnvs {
  NODE_ENV: string;
  PORT: number;
  DB_SERVER: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
}

export const envs: IEnvs = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: process.env.PORT ? +process.env.PORT : 3000,
  DB_SERVER: process.env.DB_HOST ?? "localhost",
  DB_USER: process.env.DB_USER ?? "",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "",
  DB_DATABASE: process.env.DB_DATABASE ?? "test",
  JWT_SECRET: process.env.JWT_SECRET ?? "",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? "1d",
};
