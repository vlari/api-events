import venv from './config/env';
import chalk from 'chalk';
import app from './api/app';

const port = venv.PORT;

app.listen(port, () => {
  console.log(chalk.green(`Server running in ${venv.NODE_ENV} environment`));
  console.log(chalk.blue.inverse(`Server running on port: ${port}`));
});
