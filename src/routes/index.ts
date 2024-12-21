import { Router } from "express";
import authRouter from "./auth.routes";
import categoryProductRouter from "./product-category.route";
import productRouter from "./product.route";
import statusRouter from "./status.route";
import clientRouter from "./client.route";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/product-category", categoryProductRouter);
mainRouter.use("/product", productRouter);
mainRouter.use("/status", statusRouter);
mainRouter.use("/client", clientRouter);

export default mainRouter;
