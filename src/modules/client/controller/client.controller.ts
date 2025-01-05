import ClientService from "../service/client.service";
import { Request, Response } from "express";

export class ClientController {
  private clientService = new ClientService();

  async createClient(req: Request, res: Response) {
    try {
      const createClientDto = req.body;
      const client = await this.clientService.createClient(createClientDto);
      res.status(201).json(client);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getClients(req: Request, res: Response) {
    try {
      const clients = await this.clientService.getAllClients();
      res.status(200).json(clients);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getClientById(req: Request, res: Response) {
    try {
      const clientId = req.params.id;
      const client = await this.clientService.getClientById(+clientId);
      res.status(200).json(client);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getClientByUserId(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const client = await this.clientService.getClientByUserId(+userId);
      res.status(200).json(client);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateClient(req: Request, res: Response) {
    try {
      const clientId = req.params.id;
      const updateClientDto = req.body;
      const client = await this.clientService.updateClient(
        +clientId,
        updateClientDto
      );
      res.status(200).json(client);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async changeStatusClient(req: Request, res: Response) {
    try {
      const clientId = req.params.clientId;
      const statusId = req.params.statusId;

      await this.clientService.changeStatusClient(+clientId, +statusId);

      res.status(200).json();
    } catch (error: any) {
      res
        .status(400)
        .json({ message: "Ocurrió un error", error: error.message });
    }
  }
}
