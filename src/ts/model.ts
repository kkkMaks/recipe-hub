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
  bookmarks: [],
};

export const loadRecipe = async function (id: string) {
  try {
    const data: ApiResponse = (await getJson(
      `${API_URL}${id}`
    )) as SuccessResponse;
    console.log(state);

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
    if (state.bookmarks.some((bookmark) => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
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
    state.search.page = 1;
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
  // 38
  // 0 - 12
  // 12 - 24
  // 24 - 36
  // 36 - 48
  const start = (page - 1) * state.search.resultsPerPage; // 0;
  const end = page * state.search.resultsPerPage; // 9;
  // console.log('getSearchResultsPage');
  // console.log(state.search.result.slice(start, end));
  return state.search.result.slice(start, end);
};

export const updateServings = function (newServings) {
  const coefficient = newServings / state.recipe.servings;
  state.recipe.ingredients.forEach((ingredient) => {
    ingredient.quantity = ingredient.quantity * coefficient;
  });
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (recipe: Recipe) {
  // Add bookmark
  state.bookmarks.push(recipe);
  // Mark current recipe as bookmark

  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

console.log(state.bookmarks);
