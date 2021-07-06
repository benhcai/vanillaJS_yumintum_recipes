// This is set up as an interface to be implemented by other classes.
import View from "./View";

class ViewPreview extends View {
  _parentElement = "";

  generateMarkup(data) {
    data = data ?? this._data;
    // Load pageItems & clicks or array
    let clicks = data.stateClicks ?? 0;
    const curId = window.location.hash.slice(1);
    let VBdata = data.pageItems ?? data;
    // Create markup
    let markup = "";
    VBdata.forEach((result) => {
      markup += `
        <li class="preview">
        <a class="preview__link ${result.id === curId ? "preview__link--active" : ""}" href="#${
        result.id
      }" data-track="${result.id}, ${curId}">
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
    return markup;
  }

  // listenForActive() {
  //   window.addEventListener("hashchange", () => {
  //     let hash = `${window.location.hash}`; //# a1....

  //     // Keep track of current and last hash
  //     console.log("clicks", this.clicks);
  //     this.clicks++;
  //     this.hashArr[0] = this.hashArr[1];
  //     this.hashArr[1] = hash;
  //     // On second select, remove class for old has
  //     if (this.clicks > 1) {
  //       let elementOld = document.querySelector(`a[href='${this.hashArr[0]}']`).parentElement;
  //       elementOld.classList.remove("preview__link--active");
  //     }

  //     // Highlight new active
  //     let element = document.querySelector(`a[href='${hash}']`).parentElement;
  //     element.classList.add("preview__link--active");

  //     console.log({ hash, element, clicks: this.clicks, hashArr: this.hashArr });
  //   });
  // }
}

export default new ViewPreview();
