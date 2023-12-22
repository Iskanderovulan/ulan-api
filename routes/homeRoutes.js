import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.js';
import { getInfo } from '../controllers/getInfoController.js';
import { getProducts } from '../controllers/getProducts.js';

const router = express.Router();

router.get('/get-info', verifyToken, getInfo);
router.get('/get-products', getProducts);

export default router;