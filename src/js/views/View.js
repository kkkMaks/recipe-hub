"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const icons_svg_1 = __importDefault(require("url:../../img/icons.svg"));
class View {
    constructor() {
        this.data = {};
        this.errorMessage = 'No recipes found for your query! Please try again';
        this.defaultMessage = `Start by searching for a recipe or an ingredient. Have fun!`;
    }
    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0))
            return this.renderError();
        this.data = data;
        const markup = this.generateMarkup();
        this.clear();
        this.parentElement.insertAdjacentHTML('beforeend', markup);
    }
    renderSpinner() {
        const markup = ` 
    <div class="spinner">
      <svg>
        <use href="${icons_svg_1.default}#icon-loader"></use>
      </svg>
    </div>
    `;
        this.clear();
        this.parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    renderError(message = this.errorMessage) {
        const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons_svg_1.default}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;
        this.clear();
        this.parentElement.insertAdjacentHTML('beforeend', markup);
    }
    renderMessage(message = this.defaultMessage) {
        const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons_svg_1.default}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
        this.clear();
        this.parentElement.insertAdjacentHTML('beforeend', markup);
    }
    clear() {
        this.parentElement.innerHTML = '';
    }
}
exports.default = View;
