import View from "./View";
import ViewPreview from "./viewPreview";

class ViewSearchResults extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage =
    "The recipe was not found. It may have been moved or deleted, please try a different URL address.";
  hashArr = [];

  // S6. Renders a list of marked up divs in the results section
  _generateMarkup(data) {
    return ViewPreview.generateMarkup(data);
  }
}

export default new ViewSearchResults();
