import { Router } from "express";
import { ClientController } from "../modules/client/controller/client.controller";
import { passportMiddleware } from "../middlewares/passport.middleware";
import { validateDTO } from "../middlewares/validation.middleware";
import { CreateClientDto } from "../modules/client/dto/create-client.dto";
import { UpdateClientDto } from "../modules/client/dto/update-client.dto";

const clientRouter = Router();
const clientController = new ClientController();

//POST /api/client
clientRouter.post(
  "/",
  passportMiddleware,
  validateDTO(CreateClientDto),
  clientController.createClient.bind(clientController)
);

//GET /api/client
clientRouter.get(
  "/",
  passportMiddleware,
  clientController.getClients.bind(clientController)
);

//GET /api/client/:id
clientRouter.get(
  "/:id",
  passportMiddleware,
  clientController.getClientById.bind(clientController)
);

clientRouter.get(
  "/byUserId/:userId",
  passportMiddleware,
  clientController.getClientByUserId.bind(clientController)
);

//PUT /api/client/:id
clientRouter.patch(
  "/:id",
  passportMiddleware,
  validateDTO(UpdateClientDto),
  clientController.updateClient.bind(clientController)
);

clientRouter.put(
  "/:clientId/:statusId",
  passportMiddleware,
  clientController.changeStatusClient.bind(clientController)
);

export default clientRouter;
