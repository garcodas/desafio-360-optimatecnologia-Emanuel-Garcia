import { Router } from "express";
import { validateDTO } from "../middlewares/validation.middleware";
import { StatusController } from "../modules/status/controller/status.controller";
import { CreateStatusDto } from "../modules/status/dto/create-status.dto";
import { UpdateStatusDto } from "../modules/status/dto/update-status.dto";
import { passportMiddleware } from "../middlewares/passport.middleware";

const statusRouter = Router();
const productController = new StatusController();

//POST /api/product
statusRouter.post(
  "/",
  passportMiddleware,
  validateDTO(CreateStatusDto),
  productController.createStatus.bind(productController)
);

//GET /api/product
statusRouter.get(
  "/",
  passportMiddleware,
  productController.getStatuses.bind(productController)
);

//GET /api/product/:id
statusRouter.get(
  "/:id",
  passportMiddleware,
  productController.getStatusById.bind(productController)
);

export default statusRouter;
