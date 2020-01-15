import { Request, Response, NextFunction } from 'express';
import { validate } from "../utils";

const validateQuery = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    validate(schema, req.query);
    next();
};

export default validateQuery;
