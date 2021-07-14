import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import chalk from 'chalk';

import venv from '../config/env';
import '../config/database';
import { ApiError, InternalError, NotFoundError } from './core/ApiError';
import routes from './modules/routes';
// seeder

process.on('uncaughtException', (err) => {
  console.log(chalk.red('Uncaught Exception ' + err));
  process.exit(1);
});

const app = express();

app.use(express.json());

app.use('/api', routes);

if (venv.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => next(new NotFoundError()));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    ApiError.handle(err, res);
  } else {
    if (venv.NODE_ENV === 'development') {
      console.log(chalk.inverse.red(err));
      return res.status(500).send(err.message);
    }
    ApiError.handle(new InternalError(), res);
  }
});

export default app;