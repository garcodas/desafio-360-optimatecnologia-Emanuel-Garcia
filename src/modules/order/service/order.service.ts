import dayjs from "dayjs";
import sequelize from "../../../config/database";
import { CreateOrderDetailDto } from "../dto/create-order-detail";
import { CreateOrderDto } from "../dto/create-order.dto";
import { UpdateOrderDto } from "../dto/update-order.dto";
import { InsertType } from "../../../types/InsertType";
import { or, QueryTypes } from "sequelize";
import { Order, OrderQueryResponse } from "../../../types/Order";

class OrderService {
  async createOrder(order: CreateOrderDto): Promise<Order> {
    try {
      const newOrder = await sequelize.query<InsertType>(
        `EXEC InsertOrder
          @FullName = :FullName,
          @Address = :Address,
          @Phone = :Phone,
          @Email = :Email,
          @DeliveryDate = :DeliveryDate,
          @Total = :Total,
          @UserId = :UserId,
          @StatusId = :StatusId`,
        {
          replacements: {
            FullName: order.FullName,
            Address: order.Address,
            Phone: order.Phone,
            Email: order.Email,
            DeliveryDate: dayjs().add(2, "days").toDate(),
            Total: order.Total,
            UserId: order.UserId,
            StatusId: 1,
          },
          type: QueryTypes.SELECT,
        }
      );

      for (const detail of order.Products) {
        const orderDetail = await sequelize.query<InsertType>(
          `EXEC InsertOrderDetail
            @Qty = :Qty,
            @UnitPrice = :UnitPrice,
            @SubTotal = :SubTotal,
            @OrderId = :OrderId,
            @ProductId = :ProductId`,
          {
            replacements: {
              Qty: detail.Qty,
              UnitPrice: detail.UnitPrice,
              SubTotal: detail.SubTotal,
              OrderId: newOrder[0].InsertedId,
              ProductId: detail.ProductId,
            },
            type: QueryTypes.SELECT,
          }
        );
      }

      return {
        Id: newOrder[0].InsertedId,
        FullName: order.FullName,
        Address: order.Address,
        Phone: order.Phone,
        Email: order.Email,
        DelieveryDate: dayjs().add(2, "days").toDate(),
        Total: order.Total,
        UserId: order.UserId,
        StatusId: 1,
      };
    } catch (error) {
      console.error(error);

      throw new Error("Error creating order" + error);
    }
  }

  async getOrders(): Promise<Order[]> {
    try {
      const ordersQueryResult = await sequelize.query<OrderQueryResponse>(
        `
        SELECT O.*,
          S.Name AS StatusName 
            FROM [Order] O
	        INNER JOIN [Status] S ON O.StatusId = S.Id	
        `,
        {
          type: QueryTypes.SELECT,
        }
      );

      const orders: Order[] = ordersQueryResult.map((order) => ({
        Id: order.Id,
        FullName: order.FullName,
        Address: order.Address,
        Phone: order.Phone,
        Email: order.Email,
        DelieveryDate: order.DelieveryDate,
        Total: order.Total,
        UserId: order.UserId,
        Status: {
          Id: order.StatusId ?? 0,
          Name: order.StatusName,
        },
      }));

      return orders;
    } catch (error) {
      throw new Error("Error fetching orders" + error);
    }
  }

  async getOrderById(id: number): Promise<Order | null> {
    try {
      const order = await sequelize.query<OrderQueryResponse>(
        `
        SELECT O.*,
          S.Name AS StatusName 
            FROM [Order] O
	        INNER JOIN [Status] S ON O.StatusId = S.Id	
          WHERE O.Id = :Id
        `,
        {
          replacements: {
            Id: id,
          },
          type: QueryTypes.SELECT,
        }
      );

      return order[0];
    } catch (error) {
      throw new Error("Error fetching orders" + error);
    }
  }

  async getOrderByUserId(userId: number): Promise<Order[] | null> {
    try {
      const ordersQueryResult = await sequelize.query<OrderQueryResponse>(
        `
        SELECT O.*,
          S.Name AS StatusName 
            FROM [Order] O
	        INNER JOIN [Status] S ON O.StatusId = S.Id
          WHERE O.UserId = :UserId
        `,
        {
          replacements: {
            UserId: userId,
          },
          type: QueryTypes.SELECT,
        }
      );

      const orders: Order[] = ordersQueryResult.map((order) => ({
        Id: order.Id,
        FullName: order.FullName,
        Address: order.Address,
        Phone: order.Phone,
        Email: order.Email,
        DelieveryDate: order.DelieveryDate,
        Total: order.Total,
        UserId: order.UserId,
        Status: {
          Id: order.StatusId ?? 0,
          Name: order.StatusName,
        },
      }));

      return orders;
    } catch (error) {
      throw new Error("Error fetching orders" + error);
    }
  }
}

export default OrderService;
