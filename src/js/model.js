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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSearchResults = exports.loadRecipe = exports.state = void 0;
const helpers_1 = require("./helpers");
const config_1 = require("./config");
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
exports.state = {
    recipe: {},
    search: {
        query: '',
        result: [],
    },
};
const loadRecipe = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, helpers_1.getJson)(`${config_1.API_URL}${id}`);
            if (data.status === 'success') {
                const recipe = data.data.recipe;
                exports.state.recipe = {
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
        }
        catch (error) {
            exports.state.recipe = {};
            throw error;
        }
    });
};
exports.loadRecipe = loadRecipe;
const loadSearchResults = function (query) {
    return __awaiter(this, void 0, void 0, function* () {
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza`;
        try {
            exports.state.search.query = query;
            const data = yield (0, helpers_1.getJson)(`${config_1.API_URL}?search=${query}`);
            exports.state.search.result = data.data.recipes.map((rec) => {
                return {
                    id: rec.id,
                    title: rec.title,
                    image: rec.image,
                    publisher: rec.publisher,
                };
            });
            // data.data.recipe;
        }
        catch (error) {
            console.log(`My erorr ${error}`);
            throw error;
        }
    });
};
exports.loadSearchResults = loadSearchResults;
