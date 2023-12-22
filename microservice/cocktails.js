import Product from "../models/Product.js";
import axios from "axios";
const categories = ["Cocktail", "Ordinary_Drink", "Beer"];

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export async function fetchCocktails() {
    for (let category of categories) {
        const response = await axios.get(
            `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`
        );
        for (let drink of response.data.drinks) {
            fetchCocktailDetails(drink.idDrink, drink.strDrinkThumb, category);
            await delay(1000); 
        }
    }
}

async function fetchCocktailDetails(id, image, category) {
    const detailsResponse = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const description = detailsResponse.data.drinks[0].strInstructions;

    saveCocktailToDB(detailsResponse.data.drinks[0].strDrink, image, description, category);
}

function saveCocktailToDB(name, img, description, category) {
    const price = parseFloat((Math.random() * (100 - 10) + 10).toFixed(2));
    const limit = Math.floor(Math.random() * (30 - 20 + 1)) + 20;

    const cocktail = new Product({
        name,
        img,
        description,
        price,
        limit,
        category,
    });

    cocktail.save();
}
