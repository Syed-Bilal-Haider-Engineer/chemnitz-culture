import express, { NextFunction, Request, Response} from 'express';
import cors from 'cors';
import  { PrismaClient } from '@prisma/client';
import { corsOptions } from './configuration/cors';
import helmet from 'helmet';
import { getUser } from './utiles/global';
import router from './api/user';

const port = process.env.PORT || 4000;
const app = express();
const prisma = new PrismaClient();

const middleware = (req: Request, res: Response, next: NextFunction) => {
  const user = getUser(req.headers?.authorization)
  res.locals = { prisma, user }
  next()
}

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet())
app.use(middleware)

app.use('/api',router)
app.listen(port, () => {
  console.log(`App started successfully on port ${port}`);
});
