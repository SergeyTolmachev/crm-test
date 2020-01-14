import client from '../config/db';
import { Task } from './Task';

const query = async (query: string, params: [any]) => { return client.query(query, params)};

const task = new Task(query);

export { task };
