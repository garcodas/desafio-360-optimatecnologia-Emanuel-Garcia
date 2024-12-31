import { Router } from "express";
import { RoleController } from "../modules/role/controller/role.controller";

const roleRouter = Router();
const roleController = new RoleController();

//GET /api/role
roleRouter.get("/", roleController.getRoles.bind(roleController));

export default roleRouter;
