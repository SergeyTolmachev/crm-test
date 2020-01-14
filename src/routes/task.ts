import express from 'express';

import { task } from "../schemas";

const router = express.Router();

router.get('/', async (req, res) => {
    const result = await task.findOne();
    return res.json(result);
});

router.get('/list', async (req, res) => {
    const result = await task.findAll();
    return res.json(result);
});

router.post('/', async (req, res) => {
    const { title, priority } = req.body;
    const result = await task.save(title, priority);
    return res.json(result);
});

router.delete('/', async (req, res) => {
    const { id } = req.body;
    const result = await task.destroy(id);
    return res.json(result);
});

export default router;
