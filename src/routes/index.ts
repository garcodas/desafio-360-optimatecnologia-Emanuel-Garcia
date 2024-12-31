import { Router } from "express";
import authRouter from "./auth.routes";
import categoryProductRouter from "./product-category.route";
import productRouter from "./product.route";
import statusRouter from "./status.route";
import clientRouter from "./client.route";
import orderRouter from "./order.route";
import roleRouter from "./role.route";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/product-category", categoryProductRouter);
mainRouter.use("/product", productRouter);
mainRouter.use("/status", statusRouter);
mainRouter.use("/client", clientRouter);
mainRouter.use("/order", orderRouter);
mainRouter.use("/role", roleRouter);

export default mainRouter;
