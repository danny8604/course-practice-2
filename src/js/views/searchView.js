class SearchView {
  #parentEl = document.querySelector('.search');
  #searchBtn = document.querySelector('.search__btn');

  getQuery() {
    const query = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return query;
    // return document.querySelector('.search__field').value;
  }

  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    // ['click'].forEach(ev => this.#searchBtn.addEventListener(ev, handler));
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
