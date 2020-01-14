import client from "../config/db";

const alasql = require('alasql');

const { Task } = require('../schemas/Task.ts');
const db = new alasql.Database('db');

let task: any;

beforeAll(() => {
        db.exec('CREATE TABLE task (' +
        '    id integer PRIMARY KEY,\n' +
        '    title character varying(255),\n' +
        '    priority smallint\n' +
        ');');
        db.exec('INSERT INTO task VALUES (1, \'Добавленная задача\', 21);');
    db.exec('INSERT INTO task VALUES (2, \'Добавленная задача\', 21);');
    db.exec('INSERT INTO task VALUES (3, \'Добавленная задача\', 21);');
    db.exec('INSERT INTO task VALUES (4, \'Добавленная задача\', 21);');
    db.exec('INSERT INTO task VALUES (5, \'Самая важная задача\', 100);');

    const query = (query: string, params: [any]) => { return { rows: db.exec(query, params)}};

    task = new Task(query);
});

test('find the most priority task', async () => {
    const result = await task.findOne();
    expect(result).toMatchObject({ id: 5, title: 'Самая важная задача', priority: 100 });
});

test('find all tasks', async () => {
    const result = await task.findAll();
    expect(result.length).toBe(5);
});

afterAll(() => {
    alasql('DROP DATABASE db');
});
