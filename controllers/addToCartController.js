import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const addToCart = async (req, res) => {
    const { productId } = req.params;
    const { userId } = req.user;

    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).send({ message: 'Product not found' });
    }

    const cart = await Cart.findOne({ userId });

    if (cart) {
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

        if (itemIndex !== -1) {
            cart.items[itemIndex].quantity += 1;
            cart.items[itemIndex].total = cart.items[itemIndex].quantity * product.price;
            await cart.save();
            res.send({ message: 'Product quantity updated in cart' });
        } else {
            const newItem = {
                product: productId,
                quantity: 1,
                total: product.price,
            };
            cart.items.push(newItem);
            await cart.save();
            res.send({ message: 'Product added to cart' });
        }

        // Update the grand total
        cart.grandTotal = cart.items.reduce((acc, rec) => acc + rec.total, 0);
        await cart.save();
    } else {
        const newCart = new Cart({
            items: [{ product: productId, quantity: 1, total: product.price }],
            userId,
            grandTotal: product.price,
        });
        await newCart.save();
        res.send({ message: 'Product added to new cart' });
    }
};

export { addToCart };

