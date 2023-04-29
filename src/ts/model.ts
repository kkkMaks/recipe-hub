import { getJson } from './helpers';
import { API_URL } from './config';

// import { Recipe } from './helpers';
// interface searchResult {
//   status: string;
//   results: number;
//   data: {
//     data: {
//       recipes: Recipe;
//     };
//   };
// }

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
  },
};

export const loadRecipe = async function (id: string) {
  try {
    const data = await getJson(`${API_URL}${id}`);

    if (data.status === 'success') {
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
  `https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza`;
  try {
    state.search.query = query;
    const data: searchResult = await getJson(`${API_URL}?search=${query}`);
    state.search.result = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        image: rec.image_url,
        publisher: rec.publisher,
      };
    });

    // data.data.recipe;
  } catch (error) {
    console.log(`My erorr ${error}`);

    throw error;
  }
};
