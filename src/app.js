import express from 'express';
import { json } from 'body-parser';
import validateRuleRouter from './routes/validate-rule';
import errorHandler from './middlewares/error-handler';

const app = express();

app.use(json());
app.use(validateRuleRouter);

app.use(errorHandler);

export default app;
