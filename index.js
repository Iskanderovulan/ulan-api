import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";

import { fetchCocktails } from "./microservice/cocktails.js";

dotenv.config();
const port = process.env.PORT || 5051;
const corsOptions = {
  origin: process.env.FRONTEND_HOST,
  optionsSuccessStatus: 200,
};

mongoose
  .set("strictQuery", false)
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connect db success"))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const app = express();
app.use(express.static("uploads"));
app.use(express.json());
app.use(cors(corsOptions));

app.use("/auth", authRoutes);
app.use("/home", homeRoutes);
app.use("/cart", cartRoutes);
app.use("/favorite", favoriteRoutes);

app.get("/fetch-cocktails", async (req, res) => {
  try {
    await fetchCocktails();
    res.send("Cocktails are being fetched and saved to the database.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching cocktails");
  }
});

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("ok");
});
