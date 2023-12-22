import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const decreaseQuantityInCart = async (req, res) => {
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

    if (cart.items[itemIndex].quantity > 1) {
        cart.items[itemIndex].quantity -= 1;
        cart.items[itemIndex].total = cart.items[itemIndex].quantity * product.price;
        cart.grandTotal -= product.price;
        await cart.save();
        res.send({ message: 'Product quantity decreased in cart' });
    } else {
        cart.grandTotal -= cart.items[itemIndex].total;
        cart.items.splice(itemIndex, 1);
        await cart.save();
        res.send({ message: 'Product removed from cart' });
    }
};

export { decreaseQuantityInCart };