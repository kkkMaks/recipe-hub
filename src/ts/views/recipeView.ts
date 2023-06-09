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

  public addHandlerUpdateServings(handler: (updateTo: number) => void) {
    this.parentElement.addEventListener('click', function (e: MouseEvent) {
      const btn = (e.target as HTMLElement).closest(
        '.btn--update-servings'
      ) as HTMLButtonElement;
      if (!btn) return;
      const updateTo = btn.dataset.updateTo;
      if (updateTo !== undefined && +updateTo > 0) handler(+updateTo);
    });
  }

  public addHandlerUpdateBookmark(handler: VoidFunction) {
    this.parentElement.addEventListener('click', (e) => {
      const btnBookmark = (e.target as Element).closest('.btn--bookmark');
      if (!btnBookmark) return;
      handler();
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
              <button class="btn--tiny btn--update-servings" data-update-to=${
                (recipeInfo.servings as number) - 1
              } >
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-update-to=${
                (recipeInfo.servings as number) + 1
              }>
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="inner-container"> 
            <div class="recipe__user-generated" ${
              recipeInfo.key ? '' : 'style="display: none;"'
            }>
              <svg>
                  <use href="${icons}#icon-user"></use>
              </svg>
                 
            </div>
            <button class="btn--round btn--bookmark">
              <svg class="">
                <use href="${icons}#icon-bookmark${
      recipeInfo.bookmarked ? '-fill' : ''
    }"></use>
              </svg>
            </button>
          
          </div>
          
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
