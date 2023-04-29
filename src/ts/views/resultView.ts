import icons from 'url:../../img/icons.svg';

import View from './View';

class ResultsView extends View {
  public parentElement = document.querySelector('.results') as HTMLElement;

  public generateMarkup(): string {
    return this.data
      .map((recipe) => {
        const markup = `
      <li class="preview">
        <a class="preview__link " href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.image}" alt="Test" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
            
          </div>
        </a>
      </li>`;

        return markup;
      })
      .join('');
  }
}

export default new ResultsView();