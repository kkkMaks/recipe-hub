import icons from 'url:../../img/icons.svg';
import View from './View';

class AddRecipeView extends View {
  public parentElement = document.querySelector('.upload') as HTMLFormElement;

  private overlay = document.querySelector('.overlay') as HTMLDivElement;
  private window = document.querySelector(
    '.add-recipe-window'
  ) as HTMLDivElement;
  private btnOpen = document.querySelector(
    '.nav__btn--add-recipe'
  ) as HTMLButtonElement;
  private btnClose = document.querySelector(
    '.btn--close-modal'
  ) as HTMLButtonElement;
  private btnUpload = document.querySelector(
    '.upload__btn'
  ) as HTMLButtonElement;

  constructor() {
    super();
    this.addHandlerShowWindow();
    this.addHandlerHideWindow();
  }

  public renderForm() {
    const markup = `
    <form class="upload">
    <div class="container_form">
      <div class="upload__column">
        <h3 class="upload__heading">Recipe data</h3>
        <label>Title</label>
        <input required name="title" placeholder="Pizza" type="text" />
        <label>Source URL</label>
        <input required name="sourceUrl" placeholder="https://www.twopeasandtheirpod.com/creamy-avocado-pasta/" type="text" />
        <label>Image URL</label>
        <input required name="image" placeholder="https://img.freepik.com/free-photo/pizza" type="text" />
        <label>Publisher</label>
        <input required name="publisher" placeholder="Maks" type="text" />
        <label>Prep time</label>
        <input required name="cookingTime" placeholder="45"  type="number" />
        <label>Servings</label>
        <input required name="servings" placeholder="4" type="number" />
      </div>

      <div class="upload__column">
        <h3 class="upload__heading">Ingredients</h3>
        <label>Ingredient 1</label>
        <input
          type="text"
          required
          name="ingredient-1"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 2</label>
        <input
          type="text"
          name="ingredient-2"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 3</label>
        <input
          type="text"
          name="ingredient-3"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 4</label>
        <input
          type="text"
          name="ingredient-4"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 5</label>
        <input
          type="text"
          name="ingredient-5"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
        <label>Ingredient 6</label>
        <input
          type="text"
          name="ingredient-6"
          placeholder="Format: 'Quantity,Unit,Description'"
        />
      </div>
    </div>
    
    <button class="btn upload__btn">
      <svg>
        <use href="${icons}#icon-upload-cloud"></use>
      </svg>
      <span>Upload</span>
    </button>
  </form>
    `;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  protected generateMarkup(): string {
    return '';
  }

  toggleWindow() {
    this.window.classList.toggle('hidden');
    this.overlay.classList.toggle('hidden');
  }

  addHandlerShowWindow() {
    this.btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    this.btnOpen.addEventListener('click', this.renderForm.bind(this));
  }

  addHandlerHideWindow() {
    this.btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this.overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler: (data: FormData) => void) {
    const form = this.parentElement;

    form.addEventListener('submit', function (e: SubmitEvent) {
      e.preventDefault();
      const formData = [...new FormData(this)];
      const data = Object.fromEntries(formData);

      handler(data);
    });
  }
}

export default new AddRecipeView();
