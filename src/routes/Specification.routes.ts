import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/CreateSpecification";

const specificationRouter = Router();

specificationRouter.post("/", (request, response) => {
  return createSpecificationController.handle(request, response);
});

export { specificationRouter };
