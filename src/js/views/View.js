import icons from 'url:../../img/icons.svg'; // parcel v2

export default class View {
  _data;

  render(data, render = true) {
    // Just can check null and undefined
    // if (!data) return this.renderError();
    if (!data || (Array.isArray(data) && data.length === 0) || data === '')
      return this.renderError();
    // console.log(data);
    this._data = data;
    // console.log(data);
    // console.log(this);
    const markup = this._generateMarkup();
    // console.log(markup);

    if (!render) return markup;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEl.querySelectorAll('*'));
    // console.log(newElements);
    // console.log(curElements);

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Update change TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log(newEl.firstChild.nodeValue.trim(), '🐑🐑🐑🐑');
        curEl.textContent = newEl.textContent;
      }
      // Update change ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        // console.log(Array.from(newEl.attributes));
        Array.from(newEl.attributes).forEach(attr => {
          // console.log(attr.name, '🐑', attr.value, '🐑🐑🐑');
          return curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
      </div>
            `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
      </div>
            `;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
          <div class="message">
                  <div>
                    <svg>
                      <use href="${icons}#icon-smile"></use>
                    </svg>
                  </div>
                  <p>${message}</p>
          </div>
                `;
    this._clear();
    // this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
