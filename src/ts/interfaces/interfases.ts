interface SearchRecipe {
  id: string;
  image_url: string;
  publisher: string;
  title: string;
  key?: string;
}

export interface State {
  recipe: Recipe | {};
  search: {
    query: string;
    result: Recipe[];
    resultsPerPage: number;
    page: number;
  };
  bookmarks?: Recipe[];
}

// StateTemp

export interface Ingredients {
  quantity: number;
  unit: string;
  description: string;
}

export interface Recipe {
  id: string;
  image: string;
  title: string;
  cookingTime?: number;
  ingredients?: Ingredients[];
  publisher: string;
  servings?: number;
  sourceUrl?: string;
  bookmarked?: boolean;
  key?: string;
}

export interface ResponseSearchRecipe {
  data: {
    recipes: SearchRecipe[];
  };
  results: number;
  status: string;
}

export interface ResponseDetailsRecipe {
  status: string;
  data: {
    recipe: {
      cooking_time: number;
      id: string;
      image_url: string;
      ingredients: Ingredients[];
      publisher: string;
      servings: number;
      source_url: string;
      title: string;
      key?: string;
    };
  };
}

export interface SuccessResponse {
  status: 'success';
  data: ResponseDetailsRecipe['data'] | ResponseSearchRecipe['data'];
  results?: number;
}

export interface FailResponse {
  status: 'fail';
  message: string;
}

export type ApiResponse = FailResponse | SuccessResponse;
