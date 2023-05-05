import icons from 'url:../../img/icons.svg';

import View from './View';
import { Recipe } from '../interfaces/interfases';

class PreviewView extends View {
  public parentElement = '';

  public generateMarkup() {
    const id = window.location.hash.slice(1);
    const recipe: Recipe = this.data as Recipe;

    return `
      <li class="preview">
        <a class="preview__link ${
          recipe.id === id ? 'preview__link--active' : ''
        }" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
            <div class="preview__user-generated ${recipe.key ? '' : 'hidden'}">
              <svg>
                  <use href="${icons}#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>`;
  }
}

export default new PreviewView();
