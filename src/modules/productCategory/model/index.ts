import sequelize from "../../../config/database";
import { Status } from "../../status/model";
import { initProductCategory, ProductCategory } from "./product-category.model";

initProductCategory(sequelize);

ProductCategory.associate({ Status });

export { ProductCategory };
