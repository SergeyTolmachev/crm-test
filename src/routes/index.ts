import express from 'express';
const router = express.Router();

import task from './task';

const routes = { task };

Object.keys(routes).forEach((route) => {
    // @ts-ignore
    router.use(`/${route}`, routes[route]);
});

export default router;
