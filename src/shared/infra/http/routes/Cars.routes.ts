import { Router } from "express";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.use(ensureAuthenticate);
carsRoutes.use(ensureAdmin);

carsRoutes.post("/", createCarController.handle);

export { carsRoutes };
