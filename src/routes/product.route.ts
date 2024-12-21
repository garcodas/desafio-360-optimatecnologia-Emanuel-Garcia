import { Router } from "express";
import { ProductController } from "../modules/product/controller/product.controller";
import { validateDTO } from "../middlewares/validation.middleware";
import { CreateProductDto } from "../modules/product/dto/create-product.dto";
import { UpdateProductDto } from "../modules/product/dto/update-product.dto";
import { passportMiddleware } from "../middlewares/passport.middleware";

const productRouter = Router();
const productController = new ProductController();

//POST /api/product
productRouter.post(
  "/",
  passportMiddleware,
  validateDTO(CreateProductDto),
  productController.createProduct.bind(productController)
);

//GET /api/product
productRouter.get(
  "/",
  passportMiddleware,
  productController.getProducts.bind(productController)
);

//GET /api/product/:id
productRouter.get(
  "/:id",
  passportMiddleware,
  productController.getProductById.bind(productController)
);

//PUT /api/product/:id
productRouter.patch(
  "/:id",
  passportMiddleware,
  validateDTO(UpdateProductDto),
  productController.updateProduct.bind(productController)
);

//DELETE /api/product/:id
productRouter.delete(
  "/:id",
  passportMiddleware,
  productController.deleteProduct.bind(productController)
);

export default productRouter;
