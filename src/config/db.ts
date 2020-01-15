import { Client } from 'pg';
import { config } from './index';

const client = new Client({ ...config.db });

client.connect()
    .then(() => {
    console.log('Соединение с базой данных успешно установлено');
    })
    .catch(() => {});

const query = async (query: string, params: [any]) => { return client.query(query, params)};

export { client, query };
