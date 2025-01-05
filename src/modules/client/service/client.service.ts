import sequelize from "../../../config/database";
import { CreateClientDto } from "../dto/create-client.dto";
import { QueryTypes } from "sequelize";
import { UpdateClientDto } from "../dto/update-client.dto";
import dayjs from "dayjs";
import { Client, ClientQueryResponse } from "../../../types/Client";
import { InsertType } from "../../../types/InsertType";

class ClientService {
  async createClient(clientDto: CreateClientDto): Promise<Client> {
    try {
      const newClient = await sequelize.query<InsertType>(
        `EXEC InsertClient
          @CompanyName = :CompanyName,
          @TradeName = :TradeName,
          @DeliveryAddress = :DeliveryAddress,
          @Phone = :Phone,
          @Email = :Email,
          @UserId = :UserId,
          @StatusId = :StatusId
        `,
        {
          replacements: {
            CompanyName: clientDto.CompanyName,
            TradeName: clientDto.TradeName,
            DeliveryAddress: clientDto.DeliveryAddress,
            Phone: clientDto.Phone,
            Email: clientDto.Email,
            UserId: clientDto.UserId,
            StatusId: clientDto.StatusId,
          },
          type: QueryTypes.SELECT,
        }
      );

      return {
        Id: newClient[0].InsertedId,
        CompanyName: clientDto.CompanyName,
        TradeName: clientDto.TradeName,
        DeliveryAddress: clientDto.DeliveryAddress,
        Phone: clientDto.Phone,
        Email: clientDto.Email,
        UserId: clientDto.UserId,
        StatusId: clientDto.StatusId,
      };
    } catch (error: any) {
      console.log(error);

      throw new Error("Error saving client" + error.message);
    }
  }

  async getAllClients(): Promise<Client[]> {
    try {
      const clientsQueryResult = await sequelize.query<ClientQueryResponse>(
        `
        SELECT C.*, 
          S.Name AS StatusName, 
          U.FullName  AS UserName 
            FROM [Client] C
          INNER JOIN [Status] S ON S.Id = C.StatusId
          INNER JOIN [User] U ON U.Id = C.UserId
        `,
        {
          type: QueryTypes.SELECT,
        }
      );
      const clients: Client[] = clientsQueryResult.map((client) => ({
        Id: client.Id,
        CompanyName: client.CompanyName,
        TradeName: client.TradeName,
        DeliveryAddress: client.DeliveryAddress,
        Phone: client.Phone,
        Email: client.Email,
        UserId: client.UserId,
        StatusId: client.StatusId,
        Status: {
          Id: client.StatusId,
          Name: client.StatusName,
        },
        User: {
          Id: client.UserId,
          FullName: client.UserName,
        },
      }));
      return clients;
    } catch (error: any) {
      throw new Error("Error getting clients" + error.message);
    }
  }

  async getClientById(id: number): Promise<Client | null> {
    try {
      const client = await sequelize.query<ClientQueryResponse>(
        `
        SELECT C.*, 
          S.Name AS StatusName, 
          U.FullName  AS UserName 
            FROM [Client] C
          INNER JOIN [Status] S ON S.Id = C.StatusId
          INNER JOIN [User] U ON U.Id = C.UserId
          WHERE C.Id = :Id
        `,
        {
          replacements: {
            Id: id,
          },
          type: QueryTypes.SELECT,
        }
      );

      if (client.length == 0) {
        return null;
      }

      return {
        Id: client[0].Id,
        CompanyName: client[0].CompanyName,
        TradeName: client[0].TradeName,
        DeliveryAddress: client[0].DeliveryAddress,
        Phone: client[0].Phone,
        Email: client[0].Email,
        UserId: client[0].UserId,
        StatusId: client[0].StatusId,
        Status: {
          Id: client[0].StatusId,
          Name: client[0].StatusName,
        },
        User: {
          Id: client[0].UserId,
          FullName: client[0].UserName,
        },
      };
    } catch (error: any) {
      throw new Error("Error getting clients" + error.message);
    }
  }

  async getClientByUserId(userId: number): Promise<Client | null> {
    try {
      const client = await sequelize.query<ClientQueryResponse>(
        `
        SELECT C.*, 
          S.Name AS StatusName, 
          U.FullName  AS UserName 
            FROM [Client] C
          INNER JOIN [Status] S ON S.Id = C.StatusId
          INNER JOIN [User] U ON U.Id = C.UserId
          WHERE UserId = :Id
        `,
        {
          replacements: {
            Id: userId,
          },
          type: QueryTypes.SELECT,
        }
      );

      if (client.length == 0) {
        return null;
      }

      return {
        Id: client[0].Id,
        CompanyName: client[0].CompanyName,
        TradeName: client[0].TradeName,
        DeliveryAddress: client[0].DeliveryAddress,
        Phone: client[0].Phone,
        Email: client[0].Email,
        UserId: client[0].UserId,
        StatusId: client[0].StatusId,
        Status: {
          Id: client[0].StatusId,
          Name: client[0].StatusName,
        },
        User: {
          Id: client[0].UserId,
          FullName: client[0].UserName,
        },
      };
    } catch (error: any) {
      throw new Error("Error getting clients" + error.message);
    }
  }

  async updateClient(id: number, clientDto: UpdateClientDto): Promise<Client> {
    try {
      const client = await this.getClientById(id);
      if (!client) {
        throw new Error("Client not found");
      }

      await sequelize.query(
        `
        EXEC UpdateClient
          @Id = :Id,
          @CompanyName = :CompanyName,
          @TradeName = :TradeName,
          @DeliveryAddress = :DeliveryAddress,
          @Phone = :Phone,
          @Email = :Email,
          @StatusId = :StatusId
        `,
        {
          replacements: {
            Id: id,
            CompanyName: clientDto.CompanyName,
            TradeName: clientDto.TradeName,
            DeliveryAddress: clientDto.DeliveryAddress,
            Phone: clientDto.Phone,
            Email: clientDto.Email,
            StatusId: clientDto.StatusId,
          },
          type: QueryTypes.SELECT,
        }
      );

      return {
        Id: id,
        CompanyName: clientDto.CompanyName ?? "",
        TradeName: clientDto.TradeName ?? "",
        DeliveryAddress: clientDto.DeliveryAddress ?? "",
        Phone: clientDto.Phone ?? "",
        Email: clientDto.Email ?? "",
        UserId: client.UserId,
        StatusId: clientDto.StatusId ?? 0,
      };
    } catch (error: any) {
      throw new Error("Error updating client" + error.message);
    }
  }
  async changeStatusClient(
    clientId: number,
    statusId: number
  ): Promise<Client> {
    try {
      const client = await this.getClientById(clientId);
      if (!client) {
        throw new Error("Client not found");
      }

      await sequelize.query(
        `
        EXEC UpdateClient
          @Id = :Id,
          @CompanyName = :CompanyName,
          @TradeName = :TradeName,
          @DeliveryAddress = :DeliveryAddress,
          @Phone = :Phone,
          @Email = :Email,
          @StatusId = :StatusId
        `,
        {
          replacements: {
            Id: client.Id,
            CompanyName: client.CompanyName,
            TradeName: client.TradeName,
            DeliveryAddress: client.DeliveryAddress,
            Phone: client.Phone,
            Email: client.Email,
            StatusId: statusId,
          },
          type: QueryTypes.SELECT,
        }
      );

      return {
        Id: client.Id,
        CompanyName: client.CompanyName,
        TradeName: client.TradeName,
        DeliveryAddress: client.DeliveryAddress,
        Phone: client.Phone,
        Email: client.Email,
        UserId: client.UserId,
        StatusId: statusId,
      };
    } catch (error: any) {
      throw new Error("Error updating client" + error.message);
    }
  }
}

export default ClientService;
