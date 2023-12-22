import Cart from "../models/Cart.js";

const getCartItems = async (req, res) => {
    const { userId } = req.user;
    const cart = await Cart.findOne({ userId }).populate('items.product');
    res.send(cart);
};

export { getCartItems };