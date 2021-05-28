import express from 'express';
import { getById, create, remove } from './user.controller';

const router = express.Router();

router.get('/:id', getById);
router.post('/', create);
router.delete('/:id', remove);

export default router;
