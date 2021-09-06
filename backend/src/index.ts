import { createServer } from 'http';
import app from './app';
import winston from 'winston';
import { db } from './database';
import { config } from './config';

db.on('connected', () => {
  winston.info('Database connetecd!');
});

db.on('disconnected', () => {
  winston.info('Database disconnected!');
});

db.on('error', (err: Error) => {
  winston.error(err.message);
  process.exit(1);
});

const server = createServer(app);

server.listen(config.PORT, () => {
  winston.info(`Listening on port ${config.PORT}`);
});
