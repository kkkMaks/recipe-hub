import icons from 'url:../../img/icons.svg';
import View from './View';

class PaginationView extends View {
  public parentElement = document.querySelector(
    '.pagination'
  ) as HTMLDivElement;
  private currPage = 1;

  private generatePreviousButton() {
    const markup = `
      <button data-goto = "${
        this.currPage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this.currPage - 1}</span>
      </button>
      `;
    return markup;
  }
  private generateNextButton() {
    const markup = `
      <button  data-goto = "${
        this.currPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${this.currPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button> 
      `;

    return markup;
  }

  public addHandlerClick(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  public generateMarkup() {
    this.currPage = this.data.page;
    // console.log(this.currPage);

    const numPages = Math.ceil(
      this.data.result.length / this.data.resultsPerPage
    );

    // Page 1 and there are other pages
    if (this.currPage === 1 && numPages > 1) {
      return this.generateNextButton();
    }

    // Last page
    if (this.currPage === numPages && numPages > 1) {
      return this.generatePreviousButton();
    }
    // Other page
    if (this.currPage < numPages) {
      const markup = `${this.generatePreviousButton()} ${this.generateNextButton()}`;

      return markup;
    }
    // Page 1 and there are no other pages
    return '';
  }
}

export default new PaginationView();
