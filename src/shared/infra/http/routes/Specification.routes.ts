import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/CreateSpecification/CreateSpecificationController";
import { ensureAuthenticate } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { ensureAdmin } from "../middlewares/ensureAdmin";

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.use(ensureAuthenticate);
specificationRoutes.use(ensureAdmin);

specificationRoutes.post("/", createSpecificationController.handle);

export { specificationRoutes };
