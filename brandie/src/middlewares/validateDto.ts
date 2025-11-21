import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export const validateDto = (DtoClass: new () => object) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dto = plainToInstance(DtoClass, req.body);
    const errors = await validate(dto, { whitelist: true, forbidNonWhitelisted: true });
    if (errors.length > 0) {
      const messages = errors.flatMap((error) =>
        Object.values(error.constraints || {})
      );
      return res.status(400).json({ message: messages.join(", ") });
    }
    req.body = dto;
    next();
  };
};