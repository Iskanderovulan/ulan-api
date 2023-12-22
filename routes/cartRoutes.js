import express from 'express';
import { addToCart } from '../controllers/addToCartController.js';
import { getCartItems } from '../controllers/getCartItemsController.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import { removeFromCart } from '../controllers/removeFromCart.js';
import { decreaseQuantityInCart } from '../controllers/decreaseQuantity.js';

const router = express.Router();

router.post('/add-to-cart/:productId', verifyToken, addToCart);
router.get('/get-cart-items', verifyToken, getCartItems);
router.delete('/remove-item/:productId', verifyToken, removeFromCart);
router.patch('/decrease-quantity/:productId', verifyToken, decreaseQuantityInCart);


export default router;

