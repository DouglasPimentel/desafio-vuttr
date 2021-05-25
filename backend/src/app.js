import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import logger from 'morgan';

import { rootRouter } from './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', rootRouter);

export default app;
