import dayjs from "dayjs";
import { CreateStatusDto } from "../dto/create-status.dto";
import { UpdateStatusDto } from "../dto/update-status.dto";
import { Status } from "../../../types/Status";
import sequelize from "../../../config/database";
import { QueryTypes } from "sequelize";
import { InsertType } from "../../../types/InsertType";
class StatusService {
  async createStatus(StatusDto: CreateStatusDto): Promise<Status> {
    try {
      const newStatus = await sequelize.query<InsertType>(
        `EXEC InsertStatus @Name = :Name`,
        {
          replacements: {
            Name: StatusDto.Name,
          },
          type: QueryTypes.SELECT,
        }
      );
      return {
        Id: newStatus[0].InsertedId,
        Name: StatusDto.Name,
      };
    } catch (error: any) {
      console.log(error);

      throw new Error("Error saving Status category" + error.message);
    }
  }

  async getStatuses(): Promise<Status[]> {
    try {
      const StatusCategories = await sequelize.query<Status>(
        `SELECT * FROM [Status]`,
        {
          type: QueryTypes.SELECT,
        }
      );

      return StatusCategories;
    } catch (error: any) {
      throw new Error("Error getting Status categories" + error.message);
    }
  }

  async getStatusById(id: number): Promise<Status | null> {
    try {
      const StatusCategories = await sequelize.query<Status>(
        `SELECT * FROM [Status] WHERE Id = :Id`,
        {
          replacements: { Id: id },
          type: QueryTypes.SELECT,
        }
      );

      return StatusCategories[0];
    } catch (error: any) {
      throw new Error("Error getting Status category" + error.message);
    }
  }
}

export default StatusService;
