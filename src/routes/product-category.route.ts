import { Router } from "express";
import { ProductCategoryController } from "../modules/productCategory/controller/product-category.controller";
import { validateDTO } from "../middlewares/validation.middleware";
import { CreateCategoryProductDto } from "../modules/productCategory/dto/create-product-category.dto";
import { UpdateProductCategoryDto } from "../modules/productCategory/dto/update-product-category.dto";
import { passportMiddleware } from "../middlewares/passport.middleware";

const categoryProductRouter = Router();
const productCategoryController = new ProductCategoryController();

//POST /api/product-category
categoryProductRouter.post(
  "/",
  passportMiddleware,
  validateDTO(CreateCategoryProductDto),
  productCategoryController.createProductCategory.bind(
    productCategoryController
  )
);

//GET /api/product-category
categoryProductRouter.get(
  "/",
  passportMiddleware,
  productCategoryController.getProductCategories.bind(productCategoryController)
);

//GET /api/product-category/:id
categoryProductRouter.get(
  "/:id",
  passportMiddleware,
  productCategoryController.getProductCategoryById.bind(
    productCategoryController
  )
);

//PUT /api/product-category/:id
categoryProductRouter.patch(
  "/:id",
  passportMiddleware,
  validateDTO(UpdateProductCategoryDto),
  productCategoryController.updateProductCategory.bind(
    productCategoryController
  )
);

//DELETE /api/product-category/:id
categoryProductRouter.delete(
  "/:id",
  passportMiddleware,
  productCategoryController.deleteProductCategory.bind(
    productCategoryController
  )
);

export default categoryProductRouter;
