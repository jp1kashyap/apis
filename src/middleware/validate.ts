import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validateRequest = (dtoClass: any): any => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoInstance);

    if (errors.length > 0) {
      const messages = errors.map((err) => ({
        field: err.property,
        message: Object.values(err.constraints || {})[0],
      }));
      return res.status(400).json({
        status: 400,
        success: false,
        message: "Validation error",
        errors: messages,
      });
    }

    next();
  };
};
