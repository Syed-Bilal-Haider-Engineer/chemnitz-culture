import express,{ Request, Response, NextFunction } from 'express';
import {Role } from '@prisma/client';
import {StatusCodes} from "http-status-codes";

const app = express()

export const users = app.post('/users', async (req:Request, res:Response) => {
  const { name, email, role } = req.body;
 const user = await res.locals.prisma.user.create({
      data: {
        name,
        email,
        location,
        role: role == Role.USER ? Role.USER : Role.ADMIN,
      },
    });
    console.log(user,"user")
    // .then((res:any) => res.json(StatusCodes.OK).json(res))
    // .catch((error:any) => res.json(StatusCodes.BAD_REQUEST))
});

app.get('/users', async (_req:Request, res:Response) => {
  const users = await res.locals.prisma.user.findMany();
  // res.json(users);
  res.json({message:'SYed Bilal ahider'})
});


app.put('/users/:id', async (req:Request, res:Response) => {
  const { id } = req.params;
  const { name, location, role } = req.body;

  try {
    const updated = await res.locals.prisma.user.update({
      where: { id },
      data: { name, location, role: role == Role.USER ? Role.USER : Role.ADMIN, },
    });
    res.json(updated);
  } catch {
    res.status(404).json({ error: 'User not found' });
  }
});

app.delete('/users/:id', async (req:Request, res:Response) => {
  const { id } = req.params;

  try {
    await res.locals.prisma.user.delete({ where: { id} });
    res.status(204).end();
  } catch {
    res.status(404).json({ error: 'User not found' });
  }
});
