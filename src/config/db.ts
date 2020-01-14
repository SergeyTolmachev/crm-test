import { Client } from 'pg';
import { config } from './index';

const client = new Client({ ...config.db });

client.connect()
    .then(() => {
    console.log('Соединение с базой данных успешно установлено');
    })
    .catch((err) => {
        console.log('Ошибка подключения к базе данных: ', err);
    });

export default client;
