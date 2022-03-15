import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationInMemory } from "@modules/cars/repositories/in-memory/SpecificationsInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecification: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationInMemory();
    createCarSpecification = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: "test",
      name: "test",
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecification.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });

  it("should not be able to add a new specification to a now-existent car", async () => {
    const car_id = "1234";
    const specifications_id = ["564321"];

    await expect(
      createCarSpecification.execute({ car_id, specifications_id })
    ).rejects.toEqual(new AppError("Car does not exists!"));
  });
});
