import View from './View.js';
import icons from '../../img/icons.svg';
class PreviewView extends View {
  _parentElement = '';
  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `
          <li class="preview">
              <a class="preview__link ${
                this._data.id === id ? 'preview__link--active' : ''
              }" href="#${this._data.id}">
                <figure class="preview__fig">
                  <img src="${this._data.image}" alt="${this._data.title}" />
                </figure>
                <div class="preview__data">
                  <h4 class="preview__title">${this._data.title}</h4>
                  <p class="preview__publisher">${this._data.publisher}</p>
                  <div class="preview__user-generated ${
                    this._data.key ? '' : 'hidden'
                  }">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                    </svg>
                  </div>
                </div>
              </a>
          </li>
    `;
  }
}
export default new PreviewView();
