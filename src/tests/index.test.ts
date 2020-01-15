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
    db.exec('INSERT INTO task VALUES (5, \'Самая важная задача\', 90);');

    const customQuery = (query: string, params: [any]) => { return { rows: db.exec(query, params)}};

    task = new Task('task', {
        type: 'object',
        additionalProperties: false,
        required: ['title', 'priority'],
        properties: {
            title: {
                type: 'string',
                length: 255,
            },
            priority: {
                type: 'integer',
                minimum: 0,
                maximum: 100,
            }
        }
    }, { customQuery });
});

test('find the most priority task', async () => {
    const result = await task.findHighestPriority();
    expect(result).toMatchObject({ id: 5, title: 'Самая важная задача', priority: 90 });
});

test('find all tasks', async () => {
    const result = await task.findAll();
    expect(result.length).toBe(5);
});

// test('add task', async () => {
//     const result = await task.save({ title: 'Добавленная задача', priority: 22 });
//     expect(result).toMatchObject({ id: 6, title: 'Добавленная задача', priority: 22 });
// });
//
// test('add one more task', async () => {
//     const result = await task.save({ title: 'Добавленная задача', priority: 32 });
//     expect(result).toMatchObject({ id: 7, title: 'Добавленная задача', priority: 32 });
// });
//
// test('add the highest priority task', async () => {
//     const result = await task.save({ title: 'The highest priority task', priority: 100 });
//     expect(result).toMatchObject({ id: 8, title: 'The highest priority task', priority: 100 });
// });
//
// test('find new the highest priority task', async () => {
//     const result = await task.findHighestPriority();
//     expect(result).toMatchObject({ id: 8, title: 'Самая важная задача', priority: 100 });
// });
//
// test('find all tasks after add', async () => {
//     const result = await task.findAll();
//     expect(result.length).toBe(8);
// });
//
// test('delete one task', async () => {
//     const result = await task.destroy(8);
//     expect(result).toMatchObject({ id: 8, title: 'Самая важная задача', priority: 100 });
// });
//
// test('delete one more task', async () => {
//     const result = await task.destroy(7);
//     expect(result).toMatchObject({ id: 7, title: 'Добавленная задача', priority: 32 });
// });
//
// test('find all tasks after delete', async () => {
//     const result = await task.findAll();
//     expect(result.length).toBe(6);
// });

afterAll(() => {
    alasql('DROP DATABASE db');
});
