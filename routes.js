import { Router } from 'express';
const router = Router();
import { createImage, editImage, createVariation } from './imageController';

router.post('/create-image', createImage);
router.post('/edit-image', editImage);
router.post('/create-variation', createVariation);

export default router;
