import View from './View.js';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // parcel v2

class ResultsView extends View {
  _parentEl = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again 🦔🦔🦔';
  _message = '🐧🐧🐧🐧🐧';

  _generateMarkup() {
    // console.log(this._data);
    const test = this._data
      .map(bookmark => {
        console.log(bookmark, '😈😈🤓🤓');
        return previewView.render(bookmark, false);
      })
      .join('');

    return test;
    //   return this._data.map(this._generateMarkupPreview).join("");
    // same const markup = this._generateMarkup();
  }
}

export default new ResultsView();
