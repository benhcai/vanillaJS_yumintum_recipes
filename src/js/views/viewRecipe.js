import View from "./View";
import { Fraction } from "fractional";

class ViewRecipe extends View {
  _parentElement = document.querySelector(".recipe");
  _errorMessage = "Choose or search for a recipe to get ingredients and cooking instructions.";
  _successMessage = "success!";

  // R2. Publish: hashchange occured or load occured event.
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((ev) => {
      return window.addEventListener(ev, handler);
    });
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--update-servings");
      if (!btn) return;
      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  addHandlerClickBookmark(handler) {
    // When this is ran, the btn--bookmark element does not exist so we need to attatch listener to parent
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--bookmark");
      if (!btn) return;

      handler();
    });
  }

  // R6. Render document (markup) inside this view component
  // inherited render(data) from View
  _generateMarkup() {
    console.log("generatemarkup", this._data);
    console.log(this._data.key);
    return `
    <figure class="recipe__fig">
      <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this._data.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${this.icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${this.icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${this._data.servings} </span>
        <span class="recipe__info-text">SERVINGS</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings btn--update-servings" data-update-to="${
            this._data.servings - 1
          }">
            <svg>
              <use href="${this.icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button class="btn--tiny btn--increase-servings btn--update-servings" data-update-to="${
            this._data.servings + 1
          }">
            <svg>
              <use href="${this.icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      
      <div class="recipe__user-generated ${this._data.key ? "" : "hidden"}">
        <svg>
          <use href="${this.icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round btn--bookmark">
        <svg class="">
          <use href="${this.icons}#icon-bookmark${this._data.bookmark ? "-fill" : ""}"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
        <h2 class="heading--2">RecipeView ingredients}</h2>
        <ul class="recipe__ingredient-list">
        ${this._data.ingredients.map((ing) => this._generateIngredients(ing)).join("")}
        </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this._data.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${this.icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
    `;
  }

  _generateIngredients(ing) {
    return `
      <li class="recipe__ingredient">
      <svg class="recipe__icon">
          <use href="${this.icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">
        ${ing.quantity ? new Fraction(ing.quantity.toFixed(1)) : ""}
      </div>
      <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
      </div>
      </li>
      `;
  }
}

export default new ViewRecipe();
