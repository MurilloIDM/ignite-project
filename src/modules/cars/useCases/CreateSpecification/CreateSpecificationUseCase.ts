import { inject, injectable } from "tsyringe";

import { AppError } from "@errors/AppError";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.specificationRepository.findByName(
      name
    );

    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists!");
    }

    await this.specificationRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
