import { Router } from 'express'
import { users } from './user'

const router = Router()

router
  // .get('/')
  .post('/users', users)
//   .get('/:id', getItem)
//   .delete('/:id', [auth, service], deleteItem)

export default router