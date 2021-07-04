import "core-js/stable";
import "regenerator-runtime/runtime";

import * as model from "./model";
import ViewRecipe from "./views/viewRecipe";
import ViewSearch from "./views/viewSearch";
import ViewSearchResults from "./views/viewSearchResults";

// Parcel hotswapping
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    // R3. Get URL ID from window
    const id = window.location.hash.slice(1);
    if (!id) throw new Error("ID not found");

    // 0. Recipe loading spinner
    ViewRecipe.renderSpinner();

    // R4. Send ID to model and wait for recipe
    let myrecipe = await model.getRecipe(id);

    // R5. Send recipe to View[recipe]
    ViewRecipe.render(myrecipe); // could instead use model.state.myrecipe and remove return from model
  } catch (err) {
    console.log(err);
    ViewRecipe.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    ViewSearchResults.renderSpinner();
    // S3. controlSearchResult gets the search query (input data)
    const query = ViewSearch.getQuery();
    if (!query) console.log("query empty", query);
    // S4. Send query to model and load search results
    await model.loadSearchResults(query);
    // S5. Render result
    console.log(model.state.search); // S5. Send to View to handle retrieved data
    // Display a list of marked up divs in the results section
    ViewSearchResults.render(model.state.search);
  } catch (err) {
    console.log("controlSearch", err);
  }
};

const init = function () {
  console.clear();
  console.log("console msg inti");
  ViewRecipe.addHandlerRender(controlRecipes); // R1. controlRecipes subscribes to ViewRecipe
  controlSearchResults();
  ViewSearch.addHandlerSearch(controlSearchResults); // S1. controlSearchResult subscribes to ViewSearch[hanlder]
};

init();
