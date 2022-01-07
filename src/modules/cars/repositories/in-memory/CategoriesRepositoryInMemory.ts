import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import {
  ICategoriesRepository,
  IRequest,
} from "@modules/cars/repositories/ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = [];

  async list(): Promise<Category[]> {
    const all = this.categories;
    return all;
  }
  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }

  async create({ name, description }: IRequest): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };
