// import icons from '../img/icons.svg' // Parcel 1
import icons from "url:../../img/icons.svg"; // Parcel 2: for static assets

export default class View {
  icons = icons;
  _data;
  clicks;

  renderSpinner() {
    const markup = `
        <div class="spinner">
            <svg>
            <use href="${this.icons}#icon-loader"></use>
            </svg>
        </div>
        `;
    // this._parentElement is only defined in the children
    this._clearThenInsert(markup, this._parentElement, "afterbegin");
  }

  render(data) {
    // If there is no data or there is an array but it's empty, return error.
    this._data = data;
    let markup = this._generateMarkup(data);
    this._clearThenInsert(markup, this._parentElement, "afterbegin");
  }

  update(data) {
    this._data = data;
    let newMarkup = this._generateMarkup(data);

    // String -> Markup object. Virtual DOM living in memory.
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll("*"));
    const curElements = Array.from(this._parentElement.querySelectorAll("*"));
    // console.log("curEl", curNodes);
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // For elements whose TEXT have change, replace text.
      if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== "") {
        curEl.textContent = newEl.textContent;
      }

      // Append elements that have changed with ATTRIBUTES.
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) => curEl.setAttribute(attr.name, attr.value));
      }
    });
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${this.icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>;
      `;
    this._clearThenInsert(markup, this._parentElement, "afterbegin");
  }

  renderSuccess(message = this._successMessage) {
    const markup = `
      <div class="message">
          <div>
            <svg>
              <use href="${this.icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
        `;
  }

  _clearThenInsert = function (markup, element, position) {
    element.innerHTML = "";
    element.insertAdjacentHTML(position, markup);
  };
}
