import express from 'express';
import bodyparser from 'body-parser';

import task from './routes/task';

const app = express();

app.use(bodyparser.json());

app.use('/task', task);

app.listen(3000, () => {
    console.log('App port 3000');
});
