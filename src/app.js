import express from 'express';
import { json, urlencoded } from 'body-parser';
import validateRuleRouter from './routes/rule-validator';
import errorHandler from './middlewares/error-handler';

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(validateRuleRouter);

app.use(errorHandler);

export default app;
