import Favorite from '../models/Favorite.js';


const toggleFavorite = async (req, res) => {
    try {
        const { productId } = req.params;
        const { userId } = req.user;

        const favorite = await Favorite.findOne({ userId });

        if (favorite) {

            const productIndex = favorite.items.findIndex(item => item.product.toString() === productId);
            if (productIndex !== -1) {

                favorite.items.splice(productIndex, 1);
                await favorite.save();
                return res.status(200).send({ message: 'Product removed from favorites' });
            } else {

                favorite.items.push({ product: productId });
                await favorite.save();
                return res.status(200).send({ message: 'Product added to favorites' });
            }
        } else {

            await Favorite.create({
                items: [{ product: productId }],
                userId,
            });
            return res.status(201).send({ message: 'Product added to new favorites list' });
        }
    } catch (error) {
        res.status(500).send({ message: 'An error occurred while adding or removing the product from favorites', error });
    }
};
export { toggleFavorite };