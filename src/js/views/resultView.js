"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const View_1 = __importDefault(require("./View"));
class ResultsView extends View_1.default {
    constructor() {
        super(...arguments);
        this.parentElement = document.querySelector('.results');
    }
    generateMarkup() {
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
exports.default = new ResultsView();