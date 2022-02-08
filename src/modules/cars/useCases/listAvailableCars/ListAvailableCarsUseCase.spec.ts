import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { CreateCarUseCase } from "../createCar/CreateCarUseCase";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let createCarsUseCase: CreateCarUseCase;
let carsRepositoryInMemory: ICarsRepository;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    createCarsUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await createCarsUseCase.execute({
      name: "Car1",
      description: "Car Description",
      daily_rate: 110.0,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Car Brand",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await createCarsUseCase.execute({
      name: "Car2",
      description: "Car Description",
      daily_rate: 110.0,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Car Brand Test",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({ brand: "Car Brand Test" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await createCarsUseCase.execute({
      name: "Car3",
      description: "Car Description",
      daily_rate: 110.0,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Car Brand Test",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({ name: "Car3" });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await createCarsUseCase.execute({
      name: "Car4",
      description: "Car Description",
      daily_rate: 110.0,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Car Brand Test",
      category_id: "12345",
    });

    const cars = await listCarsUseCase.execute({ category_id: "12345" });

    expect(cars).toEqual([car]);
  });
});
