import icons from 'url:../../img/icons.svg';
import View from './View';
import { State } from '../interfaces/interfases';

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

  public addHandlerClick(handler: (goToPage: number) => void) {
    this.parentElement.addEventListener('click', function (e: MouseEvent) {
      const btn = (e.target as Element).closest(
        '.btn--inline'
      ) as HTMLButtonElement;

      if (!btn) return;

      const goToPage = btn.dataset.goto;
      if (goToPage !== undefined) {
        handler(+goToPage);
      }
    });
  }

  public generateMarkup() {
    const paginationData = this.data as State['search'];

    this.currPage = paginationData.page;

    const numPages = Math.ceil(
      paginationData.result.length / paginationData.resultsPerPage
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
