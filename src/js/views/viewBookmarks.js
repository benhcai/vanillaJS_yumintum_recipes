import View from "./View.js";
import ViewPreview from "./viewPreview";

class ViewBookmarks extends View {
  _parentElement = document.querySelector(".bookmarks__list");
  _errorMessage = "No bookmarks yet. Find a recipe you then bookmark it to see it here.";

  addHandlerPageLoad(handler) {
    addEventListener("load", function () {
      handler();
    });
  }

  _generateMarkup(data) {
    return ViewPreview.generateMarkup(data);
  }
}

export default new ViewBookmarks();
