import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticate(
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;
  const usersRepository = new UsersRepository();

  if (!authHeader) {
    throw new AppError("Token missing!", 401);
  }

  const [, token] = authHeader.split(" ");

  let user_id: string = null;
  try {
    const { sub } = verify(token, auth.secret_token) as IPayload;
    user_id = sub;
  } catch {
    throw new AppError("Invalid token!", 401);
  }

  const user = await usersRepository.findById(user_id);

  if (!user) {
    throw new AppError("User does not exists!", 401);
  }

  request.user = { id: user_id };

  next();
}
