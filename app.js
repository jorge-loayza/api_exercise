import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/usersRoutes.js';
import { protegida } from './controllers/usersController.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
const prefix = '/api';
app.use(express.json());

app.use(prefix + '/usuarios', userRoutes);
app.use(prefix + '/protegida', protegida);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
