import "core-js/stable";
import "regenerator-runtime/runtime";

import * as model from "./model";
import ViewRecipe from "./views/viewRecipe";
import ViewSearch from "./views/viewSearch";
import ViewSearchResults from "./views/viewSearchResults";
import ViewPagination from "./views/viewPagination";
import ViewBookmarks from "./views/viewBookmarks";

// Control processing and redering of selected recipe
const controlRecipes = async function () {
  try {
    // R3. Get URL ID from window
    const id = window.location.hash.slice(1);
    if (!id) throw new Error("ID not found");

    // 0. Recipe loading spinner
    ViewRecipe.renderSpinner();

    // Update results view to mark selected search result
    ViewSearchResults.update(model.loadSearchResultsPage()); // ViewSearchResults.update requires [recipes, clicks]
    console.log("model.state.bookmark", model.state.bookmark);
    ViewBookmarks.update(model.state.bookmarks);

    // R4. Send ID to model and wait for recipe
    let myrecipe = await model.getRecipe(id);

    // R5. Send recipe to View[recipe]
    ViewRecipe.render(myrecipe); // could instead use model.state.myrecipe and remove return from model
  } catch (err) {
    console.log(err);
    ViewRecipe.renderError();
  }
};

// Control processing of search results
const controlSearchResults = async function (myquery) {
  try {
    ViewSearchResults.renderSpinner();
    // S3. controlSearchResult gets the search query (input data)
    let query = ViewSearch.getQuery() === "" ? myquery : ViewSearch.getQuery();
    // S4. Send query to model and load results based on search query
    await model.loadSearchResults(query);
    // S5. Send list of recipes to View (ViewSearchResults & ViewPagination) to handle retrieved data
    controlPagination(1); // start on page 1
    // Highlight active recipe
    // ViewSearchResults.listenForActive();
  } catch (err) {
    console.log("controlSearch", err);
  }
};

// Control render of pages of search results and page buttons
const controlPagination = function (page) {
  // render clears the previous results, only the selected page is rendered
  ViewSearchResults.render(model.loadSearchResultsPage(page));
  ViewPagination.render(model.state.search);
};

// Control increase/decrease of servings
const controlServings = function (newServings) {
  model.updateServings(newServings);
  // ViewRecipe.render(model.state.myrecipe);
  ViewRecipe.update(model.state.myrecipe);
};

const controlBookmark = function () {
  if (!model.state.myrecipe.bookmark) model.addBookmark(model.state.myrecipe);
  else model.removeBookmark(model.state.myrecipe.id);

  ViewRecipe.update(model.state.myrecipe);

  ViewBookmarks.render(model.state.bookmarks);
};

const init = function () {
  console.clear();
  console.log("---App started from init--");
  ViewRecipe.addHandlerRender(controlRecipes); // R1. controlRecipes subscribes to ViewRecipe
  ViewRecipe.addHandlerUpdateServings(controlServings);
  ViewRecipe.addHandlerClickBookmark(controlBookmark);
  controlSearchResults("egg"); // Initialise search results so it's not empty
  ViewSearch.addHandlerSearch(controlSearchResults); // S1. controlSearchResult subscribes to ViewSearch[hanlder]
  ViewPagination.addHandlerClick(controlPagination);
};

init();
