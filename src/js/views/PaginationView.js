import View from './View.js';
import icons from '../../img/icons.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _generateBtnMarkup(side, page) {
    return side === 'next'
      ? `
        <button data-goto='${page}' style='margin-left:auto' class="btn--inline pagination__btn-next">
          <span>Page ${page}</span>
          <i class="fa-solid fa-arrow-right"></i>
        </button> 
      `
      : `
        <button data-goto='${page}' class="btn--inline pagination__btn--prev">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Page ${page}</span>
        </button>
      `;
  }
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToNum = +btn.dataset.goto;
      handler(goToNum);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // we are at page one and there are others pages...
    if (curPage === 1 && numPages > 1) {
      return this._generateBtnMarkup('next', curPage + 1);
    }
    // we are on last page...
    if (curPage === numPages && numPages > 1) {
      return this._generateBtnMarkup('prev', curPage - 1);
    }
    // we are on other pages...
    if (curPage < numPages) {
      return (
        this._generateBtnMarkup('prev', curPage - 1) +
        this._generateBtnMarkup('next', curPage + 1)
      );
    }
    // we are in page 1 and there is no other pages...
    return '';
  }
}

export default new PaginationView();
