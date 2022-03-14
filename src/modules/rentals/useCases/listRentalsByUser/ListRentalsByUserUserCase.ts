import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentailsRepository } from "@modules/rentals/repositories/IRentailsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentailsRepository
  ) {}

  async execute(user_id: string): Promise<Rental[]> {
    const rentalsByUser = await this.rentalsRepository.findByUser(user_id);

    if (!rentalsByUser.length) {
      throw new AppError("No content rentals by user.", 204);
    }

    return rentalsByUser;
  }
}

export { ListRentalsByUserUseCase };
