import express from 'express';
import 'express-async-errors';
import bodyparser from 'body-parser';

import routes from './routes';

const app = express();

app.use(bodyparser.json());

app.use('/api', routes);

app.listen(3000, () => {
    console.log('App port 3000');
});
