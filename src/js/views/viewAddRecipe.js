import View from "./View";

class ViewAddRecipe extends View {
  _parentElement = document.querySelector(".upload");
  _recipeWindow = document.querySelector(".add-recipe-window");
  _overlay = document.querySelector(".overlay");
  _btnOpen = document.querySelector(".nav__btn--add-recipe");
  _btnClose = document.querySelector(".btn--close-modal");
  _successMessage = `Successfully uploaded recipe  🎉`;

  // No interaction with the contorller is required, addHandler should run on load
  constructor() {
    super();
    this._addHandlerShowAddRecipeWindow();
    this._addHandlerShowCloseRecipeWindow();
  }

  toggleWindow() {
    this._recipeWindow.classList.toggle("hidden");
    this._overlay.classList.toggle("hidden");
  }

  _addHandlerShowAddRecipeWindow() {
    this._btnOpen.addEventListener("click", this.toggleWindow.bind(this));
  }

  _addHandlerShowCloseRecipeWindow() {
    this._btnClose.addEventListener("click", this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      // Create the new FormData object
      const dataArr = [...new FormData(this)];
      // Convert array -> object
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new ViewAddRecipe();
