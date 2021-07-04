import View from "./View";

class viewSearchResults extends View {
  _parentElement = document.querySelector(".results");
  _errorMessage =
    "The recipe was not found. It may have been moved or deleted, please try a different URL address.";

  _generateMarkup() {
    console.log("vsr", this._data.results);
    let mark = "";

    this._data.results.slice(0, 9).forEach((result) => {
      let checkActive = result.id === window.location.hash.slice(1) ? "preview__link--active" : "";
      mark += `
        <li class="preview">
        <a class="preview__link ${checkActive}" href="#${result.id}">
            <figure class="preview__fig">
                <img src="${result.image}" alt="Test" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                <div class="preview__user-generated">
                <svg>
                    <use href="${this.icons}#icon-user"></use>
                </svg>
                </div>
            </div>
        </a>
        </li>
        `;
    });

    return mark;
  }
}

export default new viewSearchResults();
