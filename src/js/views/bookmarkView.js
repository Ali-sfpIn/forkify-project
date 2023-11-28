import View from './View.js';
import previewView from './previewView.js';
import icons from '../../img/icons.svg';
class BookmarkView extends View {
  _errorMessage = 'no bookmarks yet! find a recipe and bookmark it ;)';
  _message = '';
  _parentElement = document.querySelector('.bookmarks__list');
  addRenderHandler(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new BookmarkView();
