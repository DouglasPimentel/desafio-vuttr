import express from 'express';

import { getAll, getByTag, create, remove } from './tool.controller';

const router = express.Router();

router.get('/all', getAll);
router.get('/', getByTag);
router.post('/', create);
router.delete('/:id', remove);

export default router;
