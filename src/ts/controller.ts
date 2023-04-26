interface Recipe {
  cooking_time: number;
  id: string;
  image_url: string;
  ingredients: {
    quantity: number;
    unit: string;
    description: string;
  }[];
  publisher: string;
  servings: number;
  source_url: string;
  title: string;
}

interface SuccessResponse {
  status: 'success';
  data: {
    recipe: Recipe;
  };
}

interface FailResponse {
  status: 'fail';
  message: string;
}

type ApiResponse = FailResponse | SuccessResponse;

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s: number) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
const API_KEY = '4eed75af-6ec0-42cd-ba0e-5c749b288760';
console.log('Test');

async function getRecipes() {
  try {
    const res: Response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`
    );
    const data: ApiResponse = await res.json();

    console.log(res);
    console.log(data);

    if (!res.ok && data.status === 'fail') {
      const errorMessage = data.message || 'An error occurred';
      throw new Error(`${errorMessage} status: ${res.status}`);
    }
    let recipe;
    if (data.status === 'success') {
      recipe = data.data.recipe;
      recipe = {
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
    console.log(recipe);

    return recipe;
  } catch (error) {
    console.error(error);
  }
}
getRecipes();
