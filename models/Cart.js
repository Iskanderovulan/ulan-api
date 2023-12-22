import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
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
            quantity: {
                type: Number,
                default: 1,
            },
            total: {
                type: Number,
                default: 0,
            },
        },
    ],
    grandTotal: {
        type: Number,
        default: 0,
    },
});

export default model('Cart', cartSchema);