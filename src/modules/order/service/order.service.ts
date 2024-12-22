import sequelize from "../../../config/database";
import { CreateOrderDetailDto } from "../dto/create-order-detail";
import { CreateOrderDto } from "../dto/create-order.dto";
import { UpdateOrderDto } from "../dto/update-order.dto";
import { Order, OrderDetail } from "../model";

class OrderService {
  async createOrder(order: CreateOrderDto): Promise<Order> {
    const transaction = await sequelize.transaction();
    try {
      const totalOrder = order.Products.reduce((acc, product) => {
        return acc + product.SubTotal;
      }, 0);

      const newOrder = await Order.create(
        {
          FullName: order.FullName,
          Address: order.Address,
          Total: totalOrder,
          Email: order.Email,
          Phone: order.Phone,
          OrderDate: new Date().toISOString(),
          UserId: order.UserId,
          StatusId: order.StatusId,
        },
        { transaction }
      );

      await newOrder.save();

      for (const product of order.Products) {
        const newDetail = await OrderDetail.create(
          {
            Qty: product.Qty,
            UnitPrice: product.UnitPrice,
            SubTotal: product.SubTotal,
            ProductId: product.ProductId,
            OrderId: newOrder.Id,
          },
          { transaction }
        );

        await newDetail.save();
      }
      await transaction.commit();
      return newOrder;
    } catch (error) {
      console.error(error);

      await transaction.rollback();
      throw new Error("Error creating order" + error);
    }
  }

  async getOrders(): Promise<Order[]> {
    try {
      const orders = await Order.findAll({
        include: [{ model: OrderDetail, as: "OrderDetails" }],
      });

      return orders;
    } catch (error) {
      throw new Error("Error fetching orders" + error);
    }
  }

  async getOrderById(id: number): Promise<Order | null> {
    try {
      const order = await Order.findByPk(id, {
        include: [{ model: OrderDetail, as: "OrderDetails" }],
      });

      return order;
    } catch (error) {
      throw new Error("Error fetching order" + error);
    }
  }

  async updateOrder(id: number, order: UpdateOrderDto): Promise<Order | null> {
    try {
      await Order.update(
        {
          FullName: order.FullName,
          Address: order.Address,
          Email: order.Email,
          Phone: order.Phone,
          DeliveryDate: order.DeliveryDate,
          ModifiedAt: new Date(),
        },
        {
          where: {
            Id: id,
          },
        }
      );

      return await Order.findByPk(id, {
        include: [{ model: OrderDetail, as: "OrderDetails" }],
      });
    } catch (error) {
      throw new Error("Error updating order" + error);
    }
  }

  async deleteOrder(id: number): Promise<boolean> {
    try {
      await OrderDetail.destroy({
        where: {
          OrderId: id,
        },
      });

      await Order.destroy({
        where: {
          Id: id,
        },
      });

      return true;
    } catch (error) {
      throw new Error("Error deleting order" + error);
    }
  }
}

export default OrderService;
