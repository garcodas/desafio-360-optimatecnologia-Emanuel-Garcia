import { Request, Response } from "express";
import StatusService from "../service/status.service";

export class StatusController {
  private StatusService = new StatusService();

  async createStatus(req: Request, res: Response) {
    try {
      const createStatusDto = req.body;
      const StatusCategory = await this.StatusService.createStatus(
        createStatusDto
      );
      res.status(201).json(StatusCategory);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getStatuses(req: Request, res: Response) {
    try {
      const Statuss = await this.StatusService.getStatuses();
      res.status(200).json(Statuss);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async getStatusById(req: Request, res: Response) {
    try {
      const StatusId = req.params.id;
      const Status = await this.StatusService.getStatusById(+StatusId);
      res.status(200).json(Status);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const StatusId = req.params.id;
      const updateStatusDto = req.body;
      const StatusCategory = await this.StatusService.updateStatus(
        +StatusId,
        updateStatusDto
      );
      res.status(200).json(StatusCategory);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteStatus(req: Request, res: Response) {
    try {
      const StatusId = req.params.id;
      await this.StatusService.deleteStatus(+StatusId);
      res.status(200).json({ message: "Status category deleted" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}
