import { Request, Response } from "express";
import { container } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { ListRentalsByUserUseCase } from "./ListRentalsByUserUserCase";

class ListRentalsByUserController {
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<Rental[]>> {
    const { id } = request.user;

    const listRentalsByUserUseCase = container.resolve(
      ListRentalsByUserUseCase
    );

    const rentals = await listRentalsByUserUseCase.execute(id);

    return response.json(rentals);
  }
}

export { ListRentalsByUserController };
