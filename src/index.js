import 'dotenv/config';
import app from './app';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App connected to database and running on port ${port}`); // eslint-disable-line no-console
});
