import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import logger from 'morgan';
import { notFoundHandler, errorHandler } from './error';

import { rootRouter, userRouter, toolRouter } from './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', rootRouter);
app.use('/api/users', userRouter);
app.use('/api/tools', toolRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
