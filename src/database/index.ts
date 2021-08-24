import mongoose from 'mongoose';
import chalk from 'chalk';
import venv from '../config/env';

const connectionOptions = '?retryWrites=true&w=majority';
const connectionString = `${venv.DB_URI}/${venv.DB_NAME}${connectionOptions}`;

console.info('cstring: ', connectionString);

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(
      chalk.inverse.yellow(
        'Database connection has been stablished successfully'
      )
    );
  })
  .catch((e) => {
    console.log(chalk.inverse.red('Unable to connect to the database', e));
  });

mongoose.connection.on('error', (err) => {
  console.log(chalk.inverse.red('Database connectionerror' + err));
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(chalk.inverse.yellow('Database connection terminated'));
    process.exit(0);
  });
});
