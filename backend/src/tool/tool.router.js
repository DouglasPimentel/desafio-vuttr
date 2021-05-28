import express from 'express';
import { auth } from '../middlewares/auth';

import { getAll, getByTag, create, remove } from './tool.controller';

const router = express.Router();

router.get('/all', auth, getAll);
router.get('/', auth, getByTag);
router.post('/', auth, create);
router.delete('/:id', auth, remove);

export default router;
