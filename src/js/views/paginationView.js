"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const icons_svg_1 = __importDefault(require("url:../../img/icons.svg"));
const View_1 = __importDefault(require("./View"));
class PaginationView extends View_1.default {
    constructor() {
        super(...arguments);
        this.parentElement = document.querySelector('.pagination');
        this.currPage = 1;
    }
    generatePreviousButton() {
        const markup = `
      <button data-goto = "${this.currPage - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons_svg_1.default}#icon-arrow-left"></use>
        </svg>
        <span>Page ${this.currPage - 1}</span>
      </button>
      `;
        return markup;
    }
    generateNextButton() {
        const markup = `
      <button  data-goto = "${this.currPage + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${this.currPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons_svg_1.default}#icon-arrow-right"></use>
        </svg>
      </button> 
      `;
        return markup;
    }
    addHandlerClick(handler) {
        this.parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--inline');
            if (!btn)
                return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        });
    }
    generateMarkup() {
        this.currPage = this.data.page;
        console.log(this.currPage);
        const numPages = Math.ceil(this.data.result.length / this.data.resultsPerPage);
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
exports.default = new PaginationView();
