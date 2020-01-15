import client from '../config/db';
import { Task, TaskSchema } from './Task';

const query = async (query: string, params: [any]) => { return client.query(query, params)};

const task = new Task('task', TaskSchema, query);

export { task };
