import dotenv from 'dotenv';
import app from './app';
import winston from 'winston';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
  if (err) {
    winston.error(err.message);
    process.exit(1);
  }
  winston.info(`Listining on port ${PORT}`);
});
