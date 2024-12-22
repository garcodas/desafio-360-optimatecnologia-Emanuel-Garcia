import OrderService from "../service/order.service";
import { Request, Response } from "express";

export class OrderController {
  private orderService = new OrderService();

  async createOrder(req: Request, res: Response) {
    try {
      const createOrderDto = req.body;
      const order = await this.orderService.createOrder(createOrderDto);
      res.status(201).json(order);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getOrders(req: Request, res: Response) {
    try {
      const orders = await this.orderService.getOrders();
      res.status(200).json(orders);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getOrderById(req: Request, res: Response) {
    try {
      const orderId = req.params.id;
      const order = await this.orderService.getOrderById(+orderId);
      res.status(200).json(order);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateOrder(req: Request, res: Response) {
    try {
      const orderId = req.params.id;
      const updateOrderDto = req.body;
      const order = await this.orderService.updateOrder(
        +orderId,
        updateOrderDto
      );
      res.status(200).json(order);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteOrder(req: Request, res: Response) {
    try {
      const orderId = req.params.id;
      await this.orderService.deleteOrder(+orderId);
      res.status(200).json({ message: "Order deleted" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
