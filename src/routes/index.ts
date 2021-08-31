import { Router } from "express";

import { categoriesRoutes } from "./Categories.routes";
import { specificationRoutes } from "./Specification.routes";
import { usersRoutes } from "./Users.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", usersRoutes);

export { router };
