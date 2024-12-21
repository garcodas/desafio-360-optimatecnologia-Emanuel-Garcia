import sequelize from "../../../config/database";
import { CreateClientDto } from "../dto/create-client.dto";
import { QueryTypes } from "sequelize";
import { Client } from "../model/client.model";
import { UpdateClientDto } from "../dto/update-client.dto";
import dayjs from "dayjs";

class ClientService {
  async createClient(clientDto: CreateClientDto): Promise<Client> {
    try {
      const newClient = await Client.create({
        CompanyName: clientDto.CompanyName,
        TradeName: clientDto.TradeName,
        DeliveryAddress: clientDto.DeliveryAddress,
        Phone: clientDto.Phone,
        Email: clientDto.Email,
      });
      return newClient;
    } catch (error: any) {
      console.log(error);

      throw new Error("Error saving client" + error.message);
    }
  }

  async getAllClients(): Promise<Client[]> {
    try {
      const clients = await Client.findAll();
      return clients;
    } catch (error: any) {
      throw new Error("Error getting clients" + error.message);
    }
  }

  async getClientById(id: number): Promise<Client | null> {
    try {
      const client = await Client.findByPk(id);
      return client;
    } catch (error: any) {
      throw new Error("Error getting client by id" + error.message);
    }
  }

  async updateClient(id: number, clientDto: UpdateClientDto): Promise<Client> {
    try {
      const client = await Client.findByPk(id);
      if (!client) {
        throw new Error("Client not found");
      }
      client.CompanyName = clientDto.CompanyName ?? client.CompanyName;
      client.TradeName = clientDto.TradeName ?? client.TradeName;
      client.DeliveryAddress =
        clientDto.DeliveryAddress ?? client.DeliveryAddress;
      client.Phone = clientDto.Phone ?? client.Phone;
      client.Email = clientDto.Email ?? client.Email;
      client.ModifiedAt = dayjs().toDate().toISOString();
      await client.save();
      return client;
    } catch (error: any) {
      throw new Error("Error updating client" + error.message);
    }
  }

  async deleteClient(id: number): Promise<boolean> {
    try {
      const client = await Client.findByPk(id);

      if (!client) {
        throw new Error("Client not found");
      }

      await client.destroy();
      return true;
    } catch (error: any) {
      throw new Error("Error deleting client" + error.message);
    }
  }
}

export default ClientService;
