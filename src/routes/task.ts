import express, { Request, Response } from 'express';
import validateQuery from "../middlewares/validateQuery";

import { task } from "../schemas";

const router = express.Router();

const querySchema = {
    type: 'object',
    additionalProperties: false,
    required: ['id'],
    properties: {
        id: {
            type: 'integer',
            minimum: 1,
        }
    }
};

router.get('/', async (req: Request, res: Response) => {
    const result = await task.findHighestPriority();
    return res.json(result);
});

router.get('/list', async (req: Request, res: Response) => {
    const result = await task.findAll();
    return res.json(result);
});

router.post('/', async (req: Request, res: Response) => {
    const result = await task.save(req.body);
    return res.json(result);
});

router.delete('/', validateQuery(querySchema), async (req: Request, res: Response) => {
    const { id } = req.query;
    const result = await task.destroy(id);
    return res.json(result);
});

export default router;
