import dayjs from "dayjs";
import { Status } from "../model/status.model";
import { CreateStatusDto } from "../dto/create-status.dto";
import { UpdateStatusDto } from "../dto/update-status.dto";
class StatusService {
  async createStatus(StatusDto: CreateStatusDto): Promise<Status> {
    try {
      const newStatus = await Status.create({
        Name: StatusDto.Name,
      });
      return newStatus;
    } catch (error: any) {
      console.log(error);

      throw new Error("Error saving Status category" + error.message);
    }
  }

  async getStatuses(): Promise<Status[]> {
    try {
      const StatusCategories = await Status.findAll();
      return StatusCategories;
    } catch (error: any) {
      throw new Error("Error getting Status categories" + error.message);
    }
  }

  async getStatusById(id: number): Promise<Status | null> {
    try {
      const status = await Status.findOne({
        where: {
          Id: id,
        },
      });
      return status;
    } catch (error: any) {
      throw new Error("Error getting Status category" + error.message);
    }
  }

  async updateStatus(
    id: number,
    StatusDto: UpdateStatusDto
  ): Promise<Status | null> {
    try {
      const status = await Status.findOne({
        where: { Id: id },
      });
      if (status) {
        status.Name = StatusDto.Name ?? status.Name;
        status.ModifiedAt = dayjs().toDate().toISOString();
        await status.save();
      }
      return status;
    } catch (error: any) {
      throw new Error("Error updating Status category" + error.message);
    }
  }

  async deleteStatus(id: number): Promise<boolean> {
    try {
      const status = await Status.findOne({
        where: { Id: id },
      });
      if (status) {
        await status.destroy();
        return true;
      }
      return false;
    } catch (error: any) {
      throw new Error("Error deleting Status category" + error.message);
    }
  }
}

export default StatusService;
