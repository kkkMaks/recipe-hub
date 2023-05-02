import { getJson } from './helpers';
import { API_URL, RES_PER_PAGE } from './config';
import {
  StateTemp,
  ApiResponse,
  SuccessResponse,
  Recipe,
} from './interfaces/interfases';

export const state: StateTemp = {
  recipe: {},
  search: {
    query: '',
    result: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
};

export const loadRecipe = async function (id: string) {
  try {
    const data: ApiResponse = (await getJson(
      `${API_URL}${id}`
    )) as SuccessResponse;

    if ('recipe' in data.data) {
      const recipe = data.data.recipe;
      state.recipe = {
        id: recipe.id,
        image: recipe.image_url,
        title: recipe.title,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        publisher: recipe.publisher,
        servings: recipe.servings,
        sourceUrl: recipe.source_url,
      };
    }
  } catch (error) {
    state.recipe = {};
    throw error;
  }
};

export const loadSearchResults = async function (query: string) {
  // `https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza`;
  try {
    state.search.query = query;

    const data: ApiResponse = (await getJson(
      `${API_URL}?search=${query}`
    )) as SuccessResponse;

    if ('recipes' in data.data)
      state.search.result = data.data.recipes.map((rec) => {
        return {
          id: rec.id,
          title: rec.title,
          image: rec.image_url,
          publisher: rec.publisher,
        };
      });
  } catch (error) {
    console.log(`My erorr ${error}`);

    throw error;
  }
};
loadSearchResults(
  'https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza'
);

export const getSearchResultsPage = function (page: number = 1) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0;
  const end = page * state.search.resultsPerPage; // 9;
  return state.search.result.slice(start, end);
};

export const updateServings = function (newServings) {
  const coefficient = newServings / state.recipe.servings;
  state.recipe.ingredients.forEach((ingredient) => {
    ingredient.quantity = ingredient.quantity * coefficient;
  });
  state.recipe.servings = newServings;
};
