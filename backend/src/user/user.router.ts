import express from 'express';
import { auth } from '../middlewares/auth';
import { login, getById, create, remove } from './user.controller';

const router = express.Router();

router.get('/:id', getById);
router.post('/signup', create);
router.post('/login', login);
router.delete('/:id', auth, remove);

export default router;
