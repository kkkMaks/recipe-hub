import { getJson } from './helpers';
import { API_URL } from './config';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id: string) {
  try {
    const data = await getJson(`${API_URL}/${id}`);

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
    console.error(`<Y ${error} `);
    throw error;
  }
};
