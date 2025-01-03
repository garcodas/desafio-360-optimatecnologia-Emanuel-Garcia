import sequelize from "../../../config/database";
import { ProductCategory } from "../../productCategory/model/product-category.model";
import { initStatus, Status } from "./status.model";

initStatus(sequelize);

// Status.associate({ ProductCategory });

export { Status };
