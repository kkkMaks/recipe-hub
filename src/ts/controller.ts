import 'core-js/stable'; // for polyfilling everything else
import 'regenerator-runtime'; // for polyfilling async/await

import {
  loadRecipe,
  loadSearchResults,
  getSearchResultsPage,
  state,
  updateServings,
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

    // Update results view to mark selected search result
    resultView.update(getSearchResultsPage(state.search.page));

    // 1) Loading data
    await loadRecipe(id);

    if (!state.recipe) throw new Error('Id not found');

    // 2) Rendering data
    recipeView.render(state.recipe);
  } catch (error: any) {
    recipeView.clear();
    recipeView.renderError(error);
    console.error(error);
  }
};

const controlSearchResults = async function () {
  try {
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

const controlServings = function (newServings) {
  // Update the recipe servings (in the state)
  updateServings(newServings);

  // Update the recipe view
  // recipeView.render(state.recipe);
  recipeView.update(state.recipe);
};

const searchBar = document.querySelector('.search__field');
const dropdown = document.querySelector('.dropdown');
const searchBtn = document.querySelector('.search__btn');

// Show dropdown on focus
searchBar?.addEventListener('focus', () => {
  dropdown.style.display = 'block';
});

// Trigger search when user clicks on an item in the dropdown
dropdown?.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    searchBar.value = e.target.textContent;
    searchBtn.click();
  }
});

// Hide dropdown when user clicks outside the search wrapper
document.addEventListener('click', (e) => {
  if (!e?.target.closest('.search__wrapper')) {
    dropdown.style.display = 'none';
  }
});

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
