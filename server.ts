import { mongoose } from '@typegoose/typegoose';
import express from 'express';
import { DB_URL, HOST, PORT } from './src/config';

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected...'));
const app = express();
app.use(express.json());
app.get('/', (req, res) => res.send('Hello world'));
app.post('/products', (req, res) => res.send(req.body));
app.listen(PORT, HOST);
console.log(`Server Running on http://localhost:${PORT}`);
