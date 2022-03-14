import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";
import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensureAuthenticated";

const rentalsRouter = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRouter.use(ensureAuthenticate);

rentalsRouter.post("/", createRentalController.handle);
rentalsRouter.post("/devolution/:id", devolutionRentalController.handle);
rentalsRouter.get("/user", listRentalsByUserController.handle);

export { rentalsRouter };
