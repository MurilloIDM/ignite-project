import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensureAuthenticated";

const rentalsRouter = Router();

const createRentalController = new CreateRentalController();

rentalsRouter.use(ensureAuthenticate);

rentalsRouter.post("/", createRentalController.handle);

export { rentalsRouter };
