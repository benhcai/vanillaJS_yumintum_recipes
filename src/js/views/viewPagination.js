import View from "./View";
import { RESULTS_PER_PAGE } from "../config";

class ViewPagination extends View {
  _parentElement = document.querySelector(".pagination");
  currentPage;

  // Publish button clicks
  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;
      const page = +btn.dataset.page;
      console.log({ btn, page });
      handler(page);
    });
  }

  _generateMarkup() {
    this.currentPage = this._data.page;
    const numRecipes = this._data.results.length;
    const numPages = Math.ceil(numRecipes / RESULTS_PER_PAGE);
    console.log({ currentPage: this.currentPage, numRecipes, numPages });

    let markup;
    // On page 1, other pages exist
    if (this.currentPage === 1 && numPages > 1) {
      markup = this._generateButton("right");
    }
    // On page x, not last page
    if (this.currentPage !== numPages && numPages > 1 && this.currentPage > 1) {
      markup = `
        ${this._generateButton("left")}
        ${this._generateButton("right")}
      `;
    }
    // On page x, last  page
    if (this.currentPage === numPages && numPages > 1) {
      markup = this._generateButton("left");
    }
    // On page 1, no other pages exist
    if (this.currentPage === 1 && numPages === 1) {
      markup = "";
    }
    return markup;
  }

  _generateButton(scenario) {
    console.log("currentPage", this.currentPage);
    switch (scenario) {
      case "left":
        return `
        <button data-page="${this.currentPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${this.icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this.currentPage - 1}</span>
        </button> `;
      case "right":
        return `
        <button data-page="${this.currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${this.currentPage + 1}</span>
            <svg class="search__icon">
            <use href="${this.icons}#icon-arrow-right"></use>
            </svg>
         </button>`;
    }
  }
}

export default new ViewPagination();
