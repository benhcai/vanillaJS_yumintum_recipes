// Getting input data is related to the DOM so it should be handled by the view.
import View from "./View";

class ViewSearch extends View {
  _parentElement = document.querySelector(".search");

  getQuery() {
    return this._parentElement.querySelector(".search__field").value;
  }

  // This (ViewSearch) is the publisher and the controller is the subscriber.
  // S2. Event: submit, Publish: event has occured.
  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new ViewSearch();
