import { Router } from "express";
import { validateDTO } from "../middlewares/validation.middleware";
import { passportMiddleware } from "../middlewares/passport.middleware";
import { OrderController } from "../modules/order/controller/order.controller";
import { CreateOrderDto } from "../modules/order/dto/create-order.dto";
import { UpdateOrderDto } from "../modules/order/dto/update-order.dto";

const orderRouter = Router();
const orderController = new OrderController();

//POST /api/order
orderRouter.post(
  "/",
  passportMiddleware,
  validateDTO(CreateOrderDto),
  orderController.createOrder.bind(orderController)
);

//GET /api/order
orderRouter.get(
  "/",
  passportMiddleware,
  orderController.getOrders.bind(orderController)
);

//GET /api/order/:id
orderRouter.get(
  "/:id",
  passportMiddleware,
  orderController.getOrderById.bind(orderController)
);

//GET /api/order/byUserId/:id
orderRouter.get(
  "/byUserId/:userId",
  passportMiddleware,
  orderController.getOrderByUserId.bind(orderController)
);

export default orderRouter;
