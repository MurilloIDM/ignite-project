import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IFiles {
  filename: string;
}

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response<void>> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarsImageUseCase = container.resolve(UploadCarImageUseCase);

    const fileNames = images.map((file) => file.filename);

    await uploadCarsImageUseCase.execute({
      car_id: id,
      images_name: fileNames,
    });

    return response.status(201).send();
  }
}

export { UploadCarImageController };
