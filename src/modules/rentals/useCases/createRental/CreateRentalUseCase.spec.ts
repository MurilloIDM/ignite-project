import dayjs from "dayjs";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { IRentailsRepository } from "@modules/rentals/repositories/IRentailsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { DayjsProvider } from "@shared/container/providers/DateProvider/implementations/DayjsProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalRepositoryInMemory: IRentailsRepository;
let carsRepositoryInMemory: ICarsRepository;
let dayjsProvider: IDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    dayjsProvider = new DayjsProvider();
    rentalRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalRepositoryInMemory,
      dayjsProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test Car",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "Brand Test",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "1232",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "1232",
        car_id: "2454",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });

  it("should not be able to create a new rental if there another open to them same user", async () => {
    await rentalRepositoryInMemory.create({
      user_id: "1232",
      car_id: "2454",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "1232",
        car_id: "2455",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
  });

  it("should not be able to create a new rental if there another open to them same car", async () => {
    await rentalRepositoryInMemory.create({
      user_id: "1234",
      car_id: "2454",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "1233",
        car_id: "2454",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable."));
  });
});
