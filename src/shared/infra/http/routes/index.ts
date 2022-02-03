import { Router } from "express";

import { authenticateRoutes } from "./Authenticate.routes";
import { carsRoutes } from "./Cars.routes";
import { categoriesRoutes } from "./Categories.routes";
import { specificationRoutes } from "./Specification.routes";
import { usersRoutes } from "./Users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRoutes);
router.use(authenticateRoutes);

export { router };