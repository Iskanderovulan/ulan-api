import express from 'express';
import { toggleFavorite } from "../controllers/toggleFavoriteController.js";
import { getFavorites } from '../controllers/getFavoritesController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/toggle-favorite/:productId', verifyToken, toggleFavorite);
router.get('/get-favorites', verifyToken, getFavorites);

export default router;  