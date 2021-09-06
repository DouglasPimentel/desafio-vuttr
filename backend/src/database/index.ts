import mongoose from 'mongoose';
import { config } from '../config';

mongoose.Promise = global.Promise;

mongoose.connect(`${config.MONGO_URI}/${config.DB_NAME}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

export const db = mongoose.connection;
