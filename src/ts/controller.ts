import 'core-js/stable'; // for polyfilling everything else
import 'regenerator-runtime'; // for polyfilling async/await

import { loadRecipe, state } from './model';
import RecipeView from './views/recipeView';

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

const recipeContainer = document.querySelector('.recipe') as HTMLDivElement;

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // const search = window.location.search;

    if (!id) return;
    RecipeView.renderSpinner();

    // 1) Loading data
    await loadRecipe(id);
    const recipe: State = state.recipe; //return {}

    if (!recipe) throw new Error('Id not found');

    // 2) Rendering data
    RecipeView.render(recipe);
  } catch (error) {
    RecipeView.clear();
    console.error(error);
  }
};

['hashchange', 'load'].forEach((event) => {
  window.addEventListener(event, controlRecipes);
});
