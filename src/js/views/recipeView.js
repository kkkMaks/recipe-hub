"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fracty_1 = __importDefault(require("fracty"));
const icons_svg_1 = __importDefault(require("url:../../img/icons.svg"));
const View_1 = __importDefault(require("./View"));
class RecipeView extends View_1.default {
    constructor() {
        super(...arguments);
        this.parentElement = document.querySelector('.recipe');
    }
    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach((event) => {
            window.addEventListener(event, handler);
        });
    }
    addHandlerUpdateServings(handler) {
        this.parentElement.addEventListener('click', function (e) {
            const btn = e.target.closest('.btn--update-servings');
            if (!btn)
                return;
            const updateTo = btn.dataset.updateTo;
            if (updateTo !== undefined && +updateTo > 0)
                handler(+updateTo);
        });
    }
    addHandlerUpdateBookmark(handler) {
        this.parentElement.addEventListener('click', (e) => {
            const btnBookmark = e.target.closest('.btn--bookmark');
            if (!btnBookmark)
                return;
            handler();
        });
    }
    generateMarkupIngredients(ingredient) {
        return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons_svg_1.default}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${ingredient.quantity ? (0, fracty_1.default)(ingredient === null || ingredient === void 0 ? void 0 : ingredient.quantity).toString() : ''}</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.description}
      </div>
    </li>
    `;
    }
    generateMarkup() {
        const recipeInfo = this.data;
        return `
        <figure class="recipe__fig">
          <img src="${recipeInfo.image}" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipeInfo.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons_svg_1.default}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipeInfo.cookingTime}</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons_svg_1.default}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipeInfo.servings}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-update-to=${recipeInfo.servings - 1} >
                <svg>
                  <use href="${icons_svg_1.default}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-to=${recipeInfo.servings + 1}>
                <svg>
                  <use href="${icons_svg_1.default}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="inner-container"> 
            <div class="recipe__user-generated ${recipeInfo.key ? '' : 'hidden'}">
              <svg>
                  <use href="${icons_svg_1.default}#icon-user"></use>
              </svg>
                 
            </div>
            <button class="btn--round btn--bookmark">
              <svg class="">
                <use href="${icons_svg_1.default}#icon-bookmark${recipeInfo.bookmarked ? '-fill' : ''}"></use>
              </svg>
            </button>
          
          </div>
          
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          
            ${recipeInfo.ingredients
            ? recipeInfo.ingredients
                .map(this.generateMarkupIngredients)
                .join(' ')
            : ''}
            
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${recipeInfo.publisher}</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipeInfo.sourceUrl}"
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
