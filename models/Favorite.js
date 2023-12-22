import { Schema, model } from 'mongoose';

const favoriteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Auth',
    },
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
            },
        },
    ],
});

export default model('Favorite', favoriteSchema);