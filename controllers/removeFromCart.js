import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const removeFromCart = async (req, res) => {
    const { productId } = req.params;
    const { userId } = req.user;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
        return res.status(404).send({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex === -1) {
        return res.status(404).send({ message: 'Product not found in cart' });
    }

    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).send({ message: 'Product not found' });
    }

    cart.grandTotal -= product.price * cart.items[itemIndex].quantity; // Update the grandTotal when removing the item
    cart.items.splice(itemIndex, 1);
    await cart.save();
    res.send({ message: 'Product removed from cart' });
};

export { removeFromCart };