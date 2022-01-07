import { Request, Response } from "express";
import { container } from "tsyringe";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

class ListCategoriesController {
  async handle(
    _request: Request,
    response: Response
  ): Promise<Response<Category[]>> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);

    const all = await listCategoriesUseCase.execute();

    return response.json(all);
  }
}

export { ListCategoriesController };
