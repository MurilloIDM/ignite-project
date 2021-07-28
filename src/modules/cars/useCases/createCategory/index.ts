import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export default(): CreateCategoryController => {
  const repository = new CategoriesRepository();
  const useCase = new CreateCategoryUseCase(repository);
  const controller = new CreateCategoryController(useCase);

  return controller;
}

