import express from 'express';
import router from './routes/index.js';
const app = express();

app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});