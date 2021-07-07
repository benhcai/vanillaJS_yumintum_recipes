import { API_URL, API_KEY, RESULTS_PER_PAGE } from "./config";
import { AJAX, getJSON, sendJSON } from "./helper";

export const state = {
  myrecipe: {},
  search: {
    query: "",
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1,
  },
  clicks: 0,
  bookmarks: [],
};

// R5. Get recipe from web API
export const getRecipe = async function (id) {
  try {
    // Fetch recipes based on url function parameter
    const data = await AJAX(`${API_URL}/${id}?key=${API_KEY}`);
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
      ...(dataParsed.key && { key: dataParsed.key }),
    };

    // Loop over the bookmarks array, if any of them equal the passed in id, then set the value for myrecipe.bookmark
    if (state.bookmarks.some((b) => b.id === id)) state.myrecipe.bookmark = true;
    else state.myrecipe.bookmark = false;
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

    const result = await AJAX(`${API_URL}?search=${query}?key=${API_KEY}`);
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
  const pageItems = state.search.results.slice(start, end);
  return { pageItems, stateClicks: state.clicks };
};

export const updateServings = function (newServings) {
  state.myrecipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.myrecipe.servings;
    // newQuant = oldQuant * newServings / oldServings
  });
  state.myrecipe.servings = Number(newServings);
};

const persistBookmarks = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

// Adding something: parameter is the whole data
export const addBookmark = function (recipe) {
  // Mark current recipe as bookmarked
  state.myrecipe.bookmark = true;
  // Add bookmark
  state.bookmarks.push(recipe);
  persistBookmarks();
};

// Removing something: parameter is only the id
export const removeBookmark = function (id) {
  state.myrecipe.bookmark = false;
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);
  persistBookmarks();
};

export const loadBookmarksFromLocalStorage = function () {
  const storedBookmarks = localStorage.getItem("bookmarks");
  if (storedBookmarks) state.bookmarks = JSON.parse(storedBookmarks);
  console.log("localbookmark", state.bookmarks, JSON.parse(storedBookmarks));
};

loadBookmarksFromLocalStorage();

// Not invoked as its only for dev work
const clearBookmarks = function () {
  localStorage.clear("bookmarks");
};

export const uploadRecipe = async function (newRecipe) {
  // Obj -> array
  try {
    const ingredients = Object.entries(newRecipe)
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        // Destructure array of values (length = 3)
        const ingArr = ing[1].replaceAll(" ", "").split(",");
        // Handle the format of the input. Three components split by 2 commas is required
        if (ingArr.length !== 3)
          throw new Error(
            "Incorrect ingredients format! Please use (note the commas): QUANTITY, UNIT, INGREDIENT. If you would like to skip a component, just leave a comma (,) in its place. Example: ,,salt."
          );
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    console.log("recipe ", recipe);
    console.log("recipejs ", JSON.stringify(recipe));
    const response = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    console.log("response", response);
    state.myrecipe = createRecipeObject(response);
    console.log("response", state.myrecipe);
    addBookmark(state.myrecipe);
    return state.myrecipe;
  } catch (err) {
    throw err;
  }
};

const createRecipeObject = function (data) {
  const dataParsed = data.data.recipe;
  console.log("dataparsed", dataParsed);
  recipeObject = {
    id: dataParsed.id,
    title: dataParsed.title,
    sourceUrl: dataParsed.source_url,
    image: dataParsed.image_url,
    publisher: dataParsed.publisher,
    cookingTime: +dataParsed.cooking_time,
    servings: +dataParsed.servings,
    ingredients: dataParsed.ingredients,
    // If recipe.key is truthy, the && will short circuit to the right site.
    ...(dataParsed.key && { key: dataParsed.key }),
  };
  return recipeObject;
};
