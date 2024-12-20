import sequelize from "../../../config/database";
import { CreateClientDto } from "../dto/create-client-dto";
import { QueryTypes } from "sequelize";
import { Client } from "../model/client.model";

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
}

export default ClientService;
