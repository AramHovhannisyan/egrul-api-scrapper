import express, { Request, Response, NextFunction } from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';
import problem from './lib/errorHandling/problem';
import searchRouter from './routes/searchRouter';
import { config } from "./lib/config/config";
import { Err } from "./lib/types/ErrorTypes";

// Swagger
import swaggerUi from 'swagger-ui-express';
import specs from './lib/config/swagger';

const app = express();

// Middlewares

if(config.server.env === 'dev'){
  app.use(logger('dev'));
}

// Body Parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({extended: true, limit: '10kb'}));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * Routes
 * Mounting Routes
 */
app.get('/health', (req, res) => res.sendStatus(200));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

app.use('/api/v1/search', searchRouter);

app.use((req, res, next) => next(problem(1002, req)));

app.use((err: Err, req: Request, res: Response, next: NextFunction) => {
  const { status, body } = err;
  res.setHeader('Content-Type', 'application/problem+json');
  res.status(status || 500);
  res.json(body);
});

const port = config.server.port || 80;

app.listen(port, () => {
  console.info(`listening on port ${port}`);
  
  mongoose
    // .connect(config.mongo.url)
    .connect(`mongodb://${config.mongo.user}:${config.mongo.password}@${config.mongo.host}:${config.mongo.port}`)
    .then(() => {
      console.info('connected to DB');
    })
    .catch(err => {
      console.info('error while connecting DB', err);
    });
});

export { app };