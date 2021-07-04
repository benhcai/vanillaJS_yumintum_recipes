import { API_URL } from "./config";
import { getJSON } from "./helper";

export const state = {
  myrecipe: {},
  search: {
    query: "",
    results: [],
  },
};

// R5. Get recipe from web API
export const getRecipe = async function (url) {
  try {
    // Fetch recipes based on url function parameter
    const data = await getJSON(`${API_URL}${url}`);
    const dataParsed = data.data.recipe;
    // Create new object with new keys
    state.myrecipe = {
      id: dataParsed.id,
      title: dataParsed.title,
      publisher: dataParsed.publisher,
      sourceUrl: dataParsed.source_url,
      image: dataParsed.image_url,
      ingredients: dataParsed.ingredients,
      servings: dataParsed.servings,
      cookingTime: dataParsed.cooking_time,
    };
    return state.myrecipe;
  } catch (err) {
    console.log("model: ", err);
    throw err;
  }
};

// S4. model.loadSearchResults retrieves the data from external web API
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const result = await getJSON(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`
    );
    const recipesParsed = result.data.recipes;
    state.search.results = recipesParsed.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    console.log("repparsed", state);
  } catch (err) {
    throw err;
  }
};
