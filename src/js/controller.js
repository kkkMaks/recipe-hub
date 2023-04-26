"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const recipeContainer = document.querySelector('.recipe');
const timeout = function (s) {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
const API_KEY = '4eed75af-6ec0-42cd-ba0e-5c749b288760';
console.log('Test');
function getRecipes() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`);
            const data = yield res.json();
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
        }
        catch (error) {
            console.error(error);
        }
    });
}
getRecipes();
