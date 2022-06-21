import View from "./View";

class ViewIcons extends View {
  _searchBtn = document.querySelector(".search__btn");
  _addSearch = this._searchBtn.querySelector("use");
  _navBtn = document.querySelector(".nav__btn");
  _addRecipe = this._navBtn.querySelector("use");
  _navBookmark = document.querySelector(".nav__btn--bookmarks");
  _addBookmark = this._navBookmark.querySelector("use");
  _uploadBtn = document.querySelector(".upload__btn");
  _addUpload = this._uploadBtn.querySelector("use");
  _iconSelectors = [];

  replaceIcons() {
    this._getSelectors();
    // this._addRecipe.setAttribute("href", `${this.icons}#icon-edit`);
    this._hrefSetter(this._iconSelectors[0], "edit");
    this._hrefSetter(this._iconSelectors[1], "bookmark");
    this._hrefSetter(this._iconSelectors[2], "search");
    this._hrefSetter(this._iconSelectors[3], "upload-cloud");
  }

  _hrefSetter(el, icon) {
    el.setAttribute("href", `${this.icons}#icon-${icon}`);
  }

  _getSelectors() {
    const emptyIcons = [this._searchBtn, this._navBtn, this._navBookmark, this._uploadBtn];
    emptyIcons.forEach((i) => this._iconSelectors.push(i.querySelector("use")));
  }
}

export default new ViewIcons();
