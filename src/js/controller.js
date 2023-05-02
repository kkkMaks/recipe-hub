"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("core-js/stable"); // for polyfilling everything else
require("regenerator-runtime"); // for polyfilling async/await
const model_1 = require("./model");
const recipeView_1 = __importDefault(require("./views/recipeView"));
const searchView_1 = __importDefault(require("./views/searchView"));
const resultView_1 = __importDefault(require("./views/resultView"));
const paginationView_1 = __importDefault(require("./views/paginationView"));
const controlRecipes = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = window.location.hash.slice(1);
            if (!id)
                return;
            recipeView_1.default.renderSpinner();
            // Update results view to mark selected search result
            resultView_1.default.update((0, model_1.getSearchResultsPage)(model_1.state.search.page));
            // 1) Loading data
            yield (0, model_1.loadRecipe)(id);
            if (!model_1.state.recipe)
                throw new Error('Id not found');
            // 2) Rendering data
            recipeView_1.default.render(model_1.state.recipe);
        }
        catch (error) {
            recipeView_1.default.clear();
            recipeView_1.default.renderError(error);
            console.error(error);
        }
    });
};
const controlSearchResults = function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Get search query
            const query = searchView_1.default.getQuery();
            if (!query)
                return;
            // Load search results
            resultView_1.default.renderSpinner();
            yield (0, model_1.loadSearchResults)(query);
            const currPage = model_1.state.search.page;
            // Render results
            resultView_1.default.render((0, model_1.getSearchResultsPage)(currPage));
            // Render pagination buttons
            console.log(model_1.state.search);
            paginationView_1.default.render(model_1.state.search);
        }
        catch (error) {
            resultView_1.default.clear();
            resultView_1.default.renderError(error);
        }
    });
};
const controlPagination = function (goToPage) {
    // Render NEW results
    resultView_1.default.render((0, model_1.getSearchResultsPage)(goToPage));
    // Render pagination buttons
    paginationView_1.default.render(model_1.state.search);
};
const controlServings = function (newServings) {
    // Update the recipe servings (in the state)
    (0, model_1.updateServings)(newServings);
    // Update the recipe view
    // recipeView.render(state.recipe);
    recipeView_1.default.update(model_1.state.recipe);
};
const searchBar = document.querySelector('.search__field');
const dropdown = document.querySelector('.dropdown');
const searchBtn = document.querySelector('.search__btn');
// Show dropdown on focus
searchBar === null || searchBar === void 0 ? void 0 : searchBar.addEventListener('focus', () => {
    dropdown.style.display = 'block';
});
// Trigger search when user clicks on an item in the dropdown
dropdown === null || dropdown === void 0 ? void 0 : dropdown.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        searchBar.value = e.target.textContent;
        searchBtn.click();
    }
});
// Hide dropdown when user clicks outside the search wrapper
document.addEventListener('click', (e) => {
    if (!(e === null || e === void 0 ? void 0 : e.target.closest('.search__wrapper'))) {
        dropdown.style.display = 'none';
    }
});
const init = function () {
    recipeView_1.default.addHandlerRender(controlRecipes);
    recipeView_1.default.addHandlerUpdateServings(controlServings);
    searchView_1.default.addHandlerSearch(controlSearchResults);
    paginationView_1.default.addHandlerClick(controlPagination);
};
init();
