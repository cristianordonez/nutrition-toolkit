import app from './app';
import { logger } from './logger';

const port = 8080;

app.listen(port, () => {
   logger.info(`App listening on port ${port}`);
});
