import { Category } from "@modules/cars/infra/typeorm/entities/Category";

export interface IRequest {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
  create({ name, description }: IRequest): Promise<void>;
}

export { ICategoriesRepository };
