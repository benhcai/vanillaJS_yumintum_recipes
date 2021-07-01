import "core-js/stable";
import "regenerator-runtime/runtime";
import * as model from "./model";
import recipeView from "./views/viewRecipe";

const recipeContainer = document.querySelector(".recipe");

const controlRecipes = async function () {
  try {
    // Get URL id
    const id = window.location.hash.slice(1);
    if (!id) throw new Error("ID not found");

    // 0. Recipe loading spinner
    recipeView.renderSpinner();

    // 1. Load recipe
    let myrecipe = await model.getRecipe(id);

    // 2. Render recipe
    recipeView.render(myrecipe);
  } catch (err) {
    console.log(err);
  }
};

["hashchange", "load"].forEach((ev) => {
  return window.addEventListener(ev, controlRecipes);
});
