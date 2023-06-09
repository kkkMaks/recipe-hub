import { AJAX } from './helpers';
import { API_URL, RES_PER_PAGE, API_KEY } from './config';
import {
  State,
  ApiResponse,
  SuccessResponse,
  Recipe,
  ResponseDetailsRecipe,
} from './interfaces/interfases';

export const state: State = {
  recipe: {},
  search: {
    query: '',
    result: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};

const createRecipeObject = function (data: ResponseDetailsRecipe) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    image: recipe.image_url,
    title: recipe.title,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id: string) {
  try {
    const data: ResponseDetailsRecipe = await AJAX(
      `${API_URL}${id}?key=${API_KEY}`
    );

    state.recipe = createRecipeObject(data) as Recipe;

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

    const data: ApiResponse = (await AJAX(
      `${API_URL}?search=${query}&key=${API_KEY}`
    )) as SuccessResponse;

    if ('recipes' in data.data)
      state.search.result = data.data.recipes.map((rec) => {
        return {
          id: rec.id,
          title: rec.title,
          image: rec.image_url,
          publisher: rec.publisher,
          ...(rec.key && { key: rec.key }),
        };
      });
    state.search.page = 1;
  } catch (error) {
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

export const updateServings = function (newServings: number) {
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

export const uploadRecipe = async function (newRecipe: Recipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(
        (entry: string[]) =>
          entry[0].startsWith('ingredient') && entry[1] !== ''
      )
      .map((ingredient: string[]) => {
        const ingArr = ingredient[1].split(',').map((el) => el.trim());
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format :)'
          );
        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients: ingredients,
    };
    const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};
