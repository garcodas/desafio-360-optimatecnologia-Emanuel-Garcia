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

//PUT /api/order/:id
orderRouter.patch(
  "/:id",
  passportMiddleware,
  validateDTO(UpdateOrderDto),
  orderController.updateOrder.bind(orderController)
);

//DELETE /api/order/:id
orderRouter.delete(
  "/:id",
  passportMiddleware,
  orderController.deleteOrder.bind(orderController)
);

export default orderRouter;
