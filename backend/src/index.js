import dotenv from 'dotenv';
import app from './app';
import winston from 'winston';
import { db } from './database';

dotenv.config();

const PORT = process.env.PORT || 3000;

db.on('connected', () => {
  winston.info('Database connetecd!');
});

db.on('disconnected', () => {
  winston.info('Database disconnected!');
});

db.on('error', err => {
  winston.error(err.message);
  process.exit(1);
});

app.listen(PORT, err => {
  if (err) {
    winston.error(err.message);
    process.exit(1);
  }
  winston.info(`Listening on port ${PORT}`);
});
