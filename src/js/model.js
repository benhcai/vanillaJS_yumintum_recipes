import { API_URL, API_KEY, RESULTS_PER_PAGE } from "./config";
import { getJSON } from "./helper";

export const state = {
  myrecipe: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1,
  },
  clicks: 0,
};

// R5. Get recipe from web API
export const getRecipe = async function (url) {
  try {
    // Fetch recipes based on url function parameter
    const data = await getJSON(`${API_URL}/${url}`);
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
    state.clicks = 0;
    state.search.page = 1;
    state.search.query = query;

    const result = await getJSON(`${API_URL}?search=${query}`);
    const recipesParsed = result.data.recipes;
    state.search.results = recipesParsed.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const loadSearchResultsPage = function (page = 1) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return [state.search.results.slice(start, end), state.clicks];
};

export const updateServings = function (newServings) {
  state.myrecipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.myrecipe.servings;
    // newQuant = oldQuant * newServings / oldServings
  });
  state.myrecipe.servings = Number(newServings);
};
