import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";
import { specificationRouter } from "./routes/Specification.routes";

const app = express();

app.use(express.json());

app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationRouter);

app.listen(3000, () => console.log("Server is running!"));
