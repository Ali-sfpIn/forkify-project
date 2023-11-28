import View from './View.js';
import previewView from './previewView.js';
import icons from '../../img/icons.svg';
class resultsView extends View {
  _errorMessage =
    'we could not find the recipe that you searched for.pleas try again!';
  _message = '';
  _parentElement = document.querySelector('.results');
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new resultsView();
