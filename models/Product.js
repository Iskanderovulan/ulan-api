import { Schema, model } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  description: { type: String, required: false },
  limit: { type: Number, required: true },
  select: { type: Boolean, default: false },
  category: { type: String, required: true },
});

export default model("Product", ProductSchema);
