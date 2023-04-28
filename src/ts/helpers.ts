import { TIMEOUT_SEC } from './config';

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

export interface Recipe {
  cooking_time?: number;
  id: string;
  image_url: string;
  ingredients?: {
    quantity: number;
    unit: string;
    description: string;
  }[];
  publisher: string;
  servings?: number;
  source_url?: string;
  title: string;
}

type ApiResponse = FailResponse | SuccessResponse;

export const timeout = function (s: number) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export async function getJson(url: string) {
  try {
    const res: Response = (await Promise.race([
      fetch(url),
      timeout(TIMEOUT_SEC),
    ])) as Response;
    const data: ApiResponse = await res.json();

    if (!res.ok && data.status === 'fail') {
      const errorMessage = data.message || 'An error occurred';
      throw new Error(`${errorMessage} status: ${res.status}`);
    }
    return data;
  } catch (err) {
    throw err;
  }
}
