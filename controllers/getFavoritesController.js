import Favorite from '../models/Favorite.js';

const getFavorites = async (req, res) => {
    try {
        const { userId } = req.user;
        const favorites = await Favorite.findOne({ userId }).populate('items.product');
        res.status(200).send(favorites);
    } catch (error) {
        res.status(500).send({ message: 'An error occurred while getting favorites', error });
    }
};

export { getFavorites };