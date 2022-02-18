import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { IRentailsRepository } from "@modules/rentals/repositories/IRentailsRepository";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: IRentailsRepository;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "1232",
      car_id: "2454",
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there another open to them same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1232",
        car_id: "2454",
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: "1232",
        car_id: "2455",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there another open to them same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "1232",
        car_id: "2454",
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: "1233",
        car_id: "2454",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
