import fracty from 'fracty';
import icons from 'url:../../img/icons.svg';

import { Ingredients, Recipe } from '../interfaces/interfases';

import View from './View';

class RecipeView extends View {
  public parentElement = document.querySelector('.recipe') as HTMLDivElement;
  public addHandlerRender(handler: VoidFunction) {
    ['hashchange', 'load'].forEach((event) => {
      window.addEventListener(event, handler);
    });
  }

  private generateMarkupIngredients(ingredient: Ingredients) {
    return `
    <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ingredient.quantity ? fracty(ingredient?.quantity).toString() : ''
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.description}
      </div>
    </li>
    `;
  }

  public generateMarkup() {
    const recipeInfo: Recipe = this.data as Recipe;
    console.log(recipeInfo);

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
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipeInfo.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipeInfo.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          
            ${
              recipeInfo.ingredients
                ? recipeInfo.ingredients
                    .map(this.generateMarkupIngredients)
                    .join(' ')
                : ''
            }
            
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipeInfo.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipeInfo.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;
  }
}

export default new RecipeView();
