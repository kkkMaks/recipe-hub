"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fractional_1 = require("fractional");
const icons_svg_1 = __importDefault(require("url:../../img/icons.svg"));
class RecipeView {
    constructor() {
        this.parentElement = document.querySelector('.recipe');
        this.data = {};
        this.renderSpinner = function () {
            const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons_svg_1.default}#icon-loader"></use>
      </svg>
    </div>
    `;
            this.parentElement.innerHTML = '';
            this.parentElement.insertAdjacentHTML('afterbegin', markup);
        };
    }
    render(data) {
        this.data = data;
        const markup = this.generateMarkup();
        this.clear();
        this.parentElement.insertAdjacentHTML('beforeend', markup);
    }
    clear() {
        this.parentElement.innerHTML = '';
    }
    generateMarkupIngredients(ingredient) {
        return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons_svg_1.default}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${ingredient.quantity ? new fractional_1.Fraction(ingredient === null || ingredient === void 0 ? void 0 : ingredient.quantity).toString() : ''}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.description}
      </div>
    </li>
    `;
    }
    generateMarkup() {
        var _a, _b, _c, _d, _e, _f;
        return `
        <figure class="recipe__fig">
          <img src="${this.data.image}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${(_a = this.data) === null || _a === void 0 ? void 0 : _a.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons_svg_1.default}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${(_b = this.data) === null || _b === void 0 ? void 0 : _b.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons_svg_1.default}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${(_c = this.data) === null || _c === void 0 ? void 0 : _c.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons_svg_1.default}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons_svg_1.default}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons_svg_1.default}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons_svg_1.default}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          
            ${((_d = this.data) === null || _d === void 0 ? void 0 : _d.ingredients)
            ? this.data.ingredients
                .map(this.generateMarkupIngredients)
                .join(' ')
            : ''}
            
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${(_e = this.data) === null || _e === void 0 ? void 0 : _e.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${(_f = this.data) === null || _f === void 0 ? void 0 : _f.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons_svg_1.default}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;
    }
}
exports.default = new RecipeView();
