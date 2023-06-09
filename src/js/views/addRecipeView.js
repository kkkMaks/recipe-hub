"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const icons_svg_1 = __importDefault(require("url:../../img/icons.svg"));
const View_1 = __importDefault(require("./View"));
class AddRecipeView extends View_1.default {
    constructor() {
        super();
        this.parentElement = document.querySelector('.upload');
        this.overlay = document.querySelector('.overlay');
        this.window = document.querySelector('.add-recipe-window');
        this.btnOpen = document.querySelector('.nav__btn--add-recipe');
        this.btnClose = document.querySelector('.btn--close-modal');
        this.btnUpload = document.querySelector('.upload__btn');
        this.addHandlerShowWindow();
        this.addHandlerHideWindow();
    }
    renderForm() {
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
        <use href="${icons_svg_1.default}#icon-upload-cloud"></use>
      </svg>
      <span>Upload</span>
    </button>
  </form>
    `;
        this.clear();
        this.parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    generateMarkup() {
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
    addHandlerUpload(handler) {
        const form = this.parentElement;
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const formData = [...new FormData(this)];
            const data = Object.fromEntries(formData);
            handler(data);
        });
    }
}
exports.default = new AddRecipeView();
