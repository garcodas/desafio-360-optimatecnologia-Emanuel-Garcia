import sequelize from "../../../config/database";
import { initOrderDetail, OrderDetail } from "./order-detail.model";
import { initOrder, Order } from "./order.model";

// Initialize models
initOrder(sequelize);
initOrderDetail(sequelize);

// Define associations
Order.associate({ OrderDetail });
OrderDetail.associate({ Order });

export { Order, OrderDetail };
