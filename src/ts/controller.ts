import 'core-js/stable'; // for polyfilling everything else
import 'regenerator-runtime'; // for polyfilling async/await

import {
  loadRecipe,
  loadSearchResults,
  getSearchResultsPage,
  state,
} from './model';
import { Recipe } from './interfaces/interfases';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';
import paginationView from './views/paginationView';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading data
    await loadRecipe(id);

    const recipe = state.recipe as Recipe;

    if (!recipe) throw new Error('Id not found');

    // 2) Rendering data
    recipeView.render(recipe);
  } catch (error: any) {
    recipeView.clear();
    recipeView.renderError(error);
    console.error(error);
  }
};

const controlSearchResults = async function () {
  try {
    console.log(1);

    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    resultView.renderSpinner();
    await loadSearchResults(query);
    const currPage = state.search.page;

    // Render results

    resultView.render(getSearchResultsPage(currPage));

    // Render pagination buttons
    console.log(state.search);
    paginationView.render(state.search);
  } catch (error) {
    resultView.clear();
    resultView.renderError(error as string);
  }
};

const controlPagination = function (goToPage: number) {
  // Render NEW results
  resultView.render(getSearchResultsPage(goToPage));
  // Render pagination buttons
  paginationView.render(state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
