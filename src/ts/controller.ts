import 'core-js/stable'; // for polyfilling everything else
import 'regenerator-runtime'; // for polyfilling async/await

import { loadRecipe, loadSearchResults, state } from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';

export interface State {
  id?: string;
  image?: string;
  title?: string;
  cookingTime?: number;
  ingredients?: {
    quantity: number;
    unit: string;
    description: string;
  }[];
  publisher?: string;
  servings?: number;
  sourceUrl?: string;
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading data
    await loadRecipe(id);
    const recipe: State = state.recipe; //return {}

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
    const query = searchView.getQuery();
    if (!query) return;

    resultView.renderSpinner();
    await loadSearchResults(query);
    const data = state.search.result;

    // render data
    resultView.render(data);
  } catch (error) {
    resultView.clear();
    resultView.renderError(error as string);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
