import icons from 'url:../../img/icons.svg';

import { Recipe, State } from '../interfaces/interfases';

export default abstract class View {
  protected errorMessage = 'No recipes found for your query! Please try again';
  protected defaultMessage = `Start by searching for a recipe or an ingredient. Have fun!`;

  protected data: Recipe | Recipe[] | State['search'] = {} as Recipe;
  protected abstract parentElement: HTMLElement;
  protected abstract generateMarkup(): string;

  public render(data: Recipe[] | Recipe, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this.data = data;
    const markup = this.generateMarkup();
    if (!render) return markup;
    this.clear();
    this.parentElement.insertAdjacentHTML('beforeend', markup);
  }

  public update(data: Recipe[] | Recipe) {
    this.data = data;

    const newMarkup = this.generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this.parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (!curEl) return;
      // Update changed Text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue?.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Update changed attributes
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  public renderSpinner() {
    const markup = ` 
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;

    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  public renderError(message: string = this.errorMessage) {
    const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>`;

    this.clear();
    this.parentElement.insertAdjacentHTML('beforeend', markup);
  }

  public renderMessage(message: string = this.defaultMessage) {
    const markup = `
    <div class="message">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this.clear();
    this.parentElement.insertAdjacentHTML('beforeend', markup);
  }

  public clear() {
    this.parentElement.innerHTML = '';
  }
}
